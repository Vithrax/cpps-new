import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CaseReplyValidator } from "@/lib/validators/case-reply";
import { errorResponse } from "@/utils/route-error";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (
      !session ||
      (session.user.permission !== "admin" &&
        session.user.permission !== "client")
    ) {
      return new Response("Unauthorized", { status: 404 });
    }

    const body = await req.json();
    const { case_id, replyText } = CaseReplyValidator.parse(body);

    const _case = await db.case.findFirst({
      where: {
        case_id,
      },
    });

    if (!_case) {
      return new Response("Case not found", { status: 404 });
    }

    if (_case.status !== "pending") {
      return new Response("Not possible to reply to case at this stage", {
        status: 409,
      });
    }

    await db.case.update({
      where: {
        case_id,
      },
      data: {
        reply: replyText,
        status: "answered",
      },
    });

    return new Response("OK");
  } catch (error) {
    errorResponse(error, "Could not create reply");
  }
}
