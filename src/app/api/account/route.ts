import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { InitialsUpdateValidator } from "@/lib/validators/initials-update";
import { errorResponse } from "@/utils/route-error";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { initials: rawInitials } = InitialsUpdateValidator.parse(body);
    const initials = rawInitials.toUpperCase();

    const existingUserWithInitials = await db.user.findFirst({
      where: {
        initials,
      },
    });

    if (existingUserWithInitials)
      return new Response("Initials already in use", { status: 409 });

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        initials,
      },
    });

    return new Response("Success");
  } catch (error) {
    return errorResponse(error, "Could not update account");
  }
}

export async function DELETE() {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.user.delete({ where: { id: session.user.id } });
    return new Response("success");
  } catch (error) {
    return errorResponse(error, "Could not delete account");
  }
}
