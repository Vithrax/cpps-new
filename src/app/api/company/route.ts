import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CompanyCreateValidator } from "@/lib/validators/company-new";
import { errorResponse } from "@/utils/route-error";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session || session.user.permission !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      brand,
      country,
      id: idString,
      name,
    } = CompanyCreateValidator.parse(body);

    const id = parseInt(idString);

    const existingCompany = await db.company.findFirst({
      where: {
        id,
      },
    });

    if (existingCompany) {
      return new Response("Company already exists", { status: 409 });
    }

    await db.company.create({
      data: {
        brand,
        country,
        id,
        name,
      },
    });

    return new Response("Success");
  } catch (error) {
    errorResponse(error, "Could not create option");
  }
}
