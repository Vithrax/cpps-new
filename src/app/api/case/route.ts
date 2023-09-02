import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CaseCreateValidator } from "@/lib/validators/case-create";
import { errorResponse } from "@/utils/route-error";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { comment, order_id } = CaseCreateValidator.parse(body);

    const order = await db.order.findFirst({
      where: {
        order_id,
      },
    });

    console.log(order);

    if (!order) {
      return new Response("Order not found", { status: 404 });
    }

    const existingCase = await db.case.findFirst({
      where: {
        orderId: order_id,
        status: "pending",
      },
    });

    if (existingCase) {
      return new Response("There is open case regarding this order", {
        status: 409,
        // pass case link in response
        statusText: `/cases/${existingCase.case_id}`,
      });
    }

    const newCase = await db.case.create({
      data: {
        comment,
        orderId: order_id.toUpperCase(),
        userId: session.user.id,
      },
    });

    return NextResponse.json({ caseId: newCase.case_id });
  } catch (error) {
    errorResponse(error, "Could not create case");
  }
}
