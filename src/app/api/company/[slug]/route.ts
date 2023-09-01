import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UpdateCompanyValidator } from "@/lib/validators/update-company";
import { errorResponse } from "@/utils/route-error";

export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getAuthSession();
    const id = parseInt(params.slug);

    if (!session || session.user.permission !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { brand, country, name } = UpdateCompanyValidator.parse(body);

    const existingCompany = await db.company.findFirst({
      where: {
        id,
      },
    });

    if (!existingCompany) {
      return new Response("Company not found", { status: 404 });
    }

    await db.company.update({
      where: {
        id,
      },
      data: {
        brand,
        country,
        name,
      },
    });

    return new Response("Success");
  } catch (error) {
    return errorResponse(error, "Could not update company data");
  }
}
