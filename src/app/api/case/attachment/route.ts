import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CaseUploadValidator } from "@/lib/validators/case-upload-attachment";
import { errorResponse } from "@/utils/route-error";
import { utapi } from "uploadthing/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { case_id, file_key, file_url } = CaseUploadValidator.parse(body);

    const _case = await db.case.findFirst({
      where: {
        case_id,
      },
    });

    if (!_case) {
      return new Response("Case not found", { status: 404 });
    }

    if (_case.attachment_key) {
      // remove current attachment from uploadthing
      await utapi.deleteFiles(file_key);
    }

    await db.case.update({
      where: {
        case_id,
      },
      data: {
        attachment_key: file_key,
        attachment_url: file_url,
      },
    });

    return new Response("OK");
  } catch (error) {
    errorResponse(error, "Attachment upload failed");
  }
}
