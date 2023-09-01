import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateProposalValidator } from "@/lib/validators/proposal-create";
import { errorResponse } from "@/utils/route-error";
import { DeviceSide } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    // TODO: swap this after test
    // if (!session || session.user.permission !== "operator") {
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { left_options, orderId, right_options } =
      CreateProposalValidator.parse(body);

    const existingOrder = await db.order.findFirst({
      where: {
        order_id: orderId,
      },
    });

    if (!existingOrder) {
      return new Response("Order not found", { status: 404 });
    }

    const amount = await db.proposal.count({
      where: {
        orderId,
      },
    });

    const newProposal = await db.proposal.create({
      data: {
        orderId: orderId.toUpperCase(),
        userId: session.user.id,
        version: amount + 1,
      },
    });

    // create arrays of left and right options
    const leftOptions = left_options.map((opt) => {
      return {
        device_side: "left" as DeviceSide,
        proposalId: newProposal.proposal_id,
        proposalOptionId: opt,
      };
    });
    const rightOptions = right_options.map((opt) => {
      return {
        device_side: "right" as DeviceSide,
        proposalId: newProposal.proposal_id,
        proposalOptionId: opt,
      };
    });

    // concat arrays
    const options = [...rightOptions, ...leftOptions];

    // batch create many
    await db.optionsOnProposal.createMany({
      data: options,
    });

    return new Response("OK");
  } catch (error) {
    errorResponse(error, "Could not create proposal");
  }
}
