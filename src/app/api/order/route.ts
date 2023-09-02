import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { OrderCreateValdiator } from "@/lib/validators/new-order";
import { errorResponse } from "@/utils/route-error";
import { capitalize } from "@/utils/string";

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

    const enduser_name = rawName
      ?.split(" ")
      .map((word) => capitalize(word))
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
    return errorResponse(error, "Could not create order");
  }
}
