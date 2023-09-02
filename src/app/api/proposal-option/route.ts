import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateProposalOptionValidator } from "@/lib/validators/new-proposal-option";
import { ProposalOptionValidator } from "@/lib/validators/proposal-option-create";
import { z } from "zod";
import { errorResponse } from "@/utils/route-error";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.permission !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { id, state } = ProposalOptionValidator.parse(body);

    await db.proposalOption.update({
      where: {
        id,
      },
      data: {
        active: state,
      },
    });

    return new Response("Success");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not change status of option", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.permission !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { category, description } = CreateProposalOptionValidator.parse(body);

    let formattedDescription: string;
    if (description.length > 2 && description.length < 5) {
      formattedDescription = description.toUpperCase();
    } else {
      formattedDescription =
        description.charAt(0).toUpperCase() +
        description.slice(1).toLowerCase();
    }

    const existingOption = await db.proposalOption.findFirst({
      where: {
        description: formattedDescription.trim(),
      },
    });

    if (existingOption) {
      return new Response("Description already in use", { status: 409 });
    }

    await db.proposalOption.create({
      data: {
        category,
        description: formattedDescription.trim(),
        active: true,
      },
    });

    return new Response("Success");
  } catch (error) {
    return errorResponse(error, "Could not create option");
  }
}
