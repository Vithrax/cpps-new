import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { OrderCreateValdiator } from "@/lib/validators/new-order";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      companyId,
      first_product_id,
      order_id,
      enduser_name: rawName,
      external_id,
      second_product_id,
    } = OrderCreateValdiator.parse(body);

    const existingOrder = await db.order.findFirst({
      where: {
        order_id,
      },
    });

    if (existingOrder) {
      return new Response("Order already exists", { status: 409 });
    }

    // capitalize name
    const enduser_name = rawName
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    await db.order.create({
      data: {
        companyId,
        enduser_name,
        order_id: order_id.toUpperCase(),
        first_product_id: first_product_id.toUpperCase(),
        second_product_id: second_product_id?.toUpperCase(),
        external_id: external_id?.toUpperCase(),
      },
    });

    return new Response("OK", { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not create order", { status: 500 });
  }
}
