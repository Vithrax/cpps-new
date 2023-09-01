import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { errorResponse } from "@/utils/route-error";

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session || !(session.user.permission === "operator")) {
      return new Response("Unauthorized", { status: 401 });
    }

    const _case = await db.case.findFirst({
      where: {
        case_id: +params.slug,
      },
    });

    if (!_case) {
      return new Response("Case not found", { status: 404 });
    }

    if (_case.status !== "pending") {
      return new Response("No longer possibel to cancel order", {
        status: 409,
      });
    }

    await db.case.update({
      where: {
        case_id: +params.slug,
      },
      data: {
        status: "cancelled",
      },
    });

    return new Response("OK");
  } catch (error) {
    return errorResponse(error, "Could not cancel case");
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session || !(session.user.permission === "operator")) {
      return new Response("Unauthorized", { status: 401 });
    }

    const _case = await db.case.findFirst({
      where: {
        case_id: +params.slug,
      },
    });

    if (!_case) {
      return new Response("Case not found", { status: 404 });
    }

    if (_case.status !== "answered") {
      return new Response("Not possible to finish order at this stage", {
        status: 409,
      });
    }

    await db.case.update({
      where: {
        case_id: +params.slug,
      },
      data: {
        status: "finished",
      },
    });

    return new Response("OK");
  } catch (error) {
    return errorResponse(error, "Could not finish case");
  }
}
