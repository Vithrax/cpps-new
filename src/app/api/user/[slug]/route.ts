import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminAccountValidator } from "@/lib/validators/admin-account";
import { z } from "zod";

export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.permission !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      initials: rawInitials,
      role,
      company,
    } = AdminAccountValidator.parse(body);
    const id = params.slug;

    const initials = rawInitials.toUpperCase();
    const existingUser = await db.user.findFirst({
      where: { id },
    });

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    // validate initials only if they are different from the current ones
    // otherwise update only role
    if (existingUser.initials !== initials) {
      const initialsInUse = await db.user.findFirst({
        where: {
          initials,
        },
      });

      if (initialsInUse) {
        return new Response("Initials are already in use", { status: 409 });
      }

      await db.user.update({
        where: { id },
        data: {
          initials,
          permission_level: role,
          companyId: company,
        },
      });
    } else {
      await db.user.update({
        where: { id },
        data: {
          permission_level: role,
          companyId: company,
        },
      });
    }

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not update user data", { status: 500 });
  }
}
