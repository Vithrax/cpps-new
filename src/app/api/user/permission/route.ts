import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PermissionAddValidator } from "@/lib/validators/permission-add";
import { PermissionRemoveValidator } from "@/lib/validators/permission-remove";
import { errorResponse } from "@/utils/route-error";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.permission !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { companyId, userId } = PermissionAddValidator.parse(body);

    const existingPermission = await db.userAccess.findFirst({
      where: {
        userId,
        companyId,
      },
    });

    if (existingPermission) {
      return new Response("Permission already exists", { status: 409 });
    }

    await db.userAccess.create({
      data: {
        companyId,
        userId,
      },
    });

    return new Response("OK", { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could add user permissions", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.permission !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { id } = PermissionRemoveValidator.parse(body);

    const existingPermission = db.userAccess.findFirst({
      where: {
        id,
      },
    });

    if (!existingPermission) {
      return new Response("Permission not found", { status: 404 });
    }

    await db.userAccess.delete({
      where: {
        id,
      },
    });

    return new Response("OK");
  } catch (error) {
    return errorResponse(error, "Could not change user permissions");
  }
}
