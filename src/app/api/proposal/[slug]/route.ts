import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserAccessData } from "@/lib/fetch-user-access";
import { ProposalActionValidator } from "@/lib/validators/proposal-action";
import { errorResponse } from "@/utils/route-error";

export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json();
    const { action } = ProposalActionValidator.parse(body);

    const session = await getAuthSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { permission } = session.user;

    // helpers
    const isClient = permission === "client";
    const isOperator = permission === "operator";

    const proposal = await db.proposal.findFirst({
      where: {
        proposal_id: +params.slug,
      },
      include: {
        order: {
          select: {
            companyId: true,
          },
        },
      },
    });

    if (!proposal) {
      return new Response("Proposal not found", { status: 404 });
    }

    // only pending proposal can have its status changed
    if (proposal.status !== "pending") {
      return new Response("Not possible to cancel proposal", { status: 409 });
    }

    const userAccessList = await getUserAccessData();
    if (isClient && !userAccessList.includes(proposal.order.companyId)) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (
      // if action is accepted/rejected you have to be client
      ((action === "accepted" || action === "rejected") && isClient) ||
      // if action is cancelled you have to be operator
      (action === "cancelled" && isOperator)
    ) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.proposal.update({
      where: {
        proposal_id: +params.slug,
      },
      data: {
        status: action,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    return errorResponse(error, "Could not cancel order");
  }
}
