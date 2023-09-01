import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateProposalOptionValidator } from "@/lib/validators/new-proposal-option";
import { ProposalOptionValidator } from "@/lib/validators/update-proposal-option";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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

    await db.proposalOption.create({
      data: {
        category,
        description: formattedDescription.trim(),
        active: true,
      },
    });

    return new Response("Success");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return new Response("Description already in use", { status: 409 });
      }
    }

    return new Response("Could not create option", { status: 500 });
  }
}
