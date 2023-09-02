import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { OrderUpdateValdiator } from "@/lib/validators/order-update";
import { errorResponse } from "@/utils/route-error";

export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      companyId,
      first_product_id,
      enduser_name,
      external_id,
      second_product_id,
    } = OrderUpdateValdiator.parse(body);

    const existingOrder = await db.order.findFirst({
      where: {
        order_id: params.slug,
      },
    });

    if (!existingOrder) {
      return new Response("Order not found", { status: 404 });
    }

    await db.order.update({
      where: {
        order_id: params.slug,
      },
      data: {
        companyId,
        enduser_name,
        external_id,
        first_product_id,
        second_product_id,
      },
    });

    return new Response("OK");
  } catch (error) {
    return errorResponse(error, "Invalid request data passed");
  }
}
