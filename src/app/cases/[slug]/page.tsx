import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { authOptions, getAuthSession } from "@/lib/auth";
import CaseActionButtons from "@/components/case-action-buttons";
import CaseUploadFile from "@/components/forms/case-upload-file";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge, BadgeVariants } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/sign-in");
  }

  const _case = await db.case.findFirst({
    where: {
      case_id: +params.slug,
    },
  });

  if (!_case) {
    return notFound();
  }

  let badgeVariant: BadgeVariants;
  let borderColor: string = "";
  switch (_case.status) {
    case "answered":
      badgeVariant = "warning";
      borderColor = "border-yellow-500";
      break;
    case "cancelled":
      badgeVariant = "disabled";
      break;
    case "finished":
      badgeVariant = "success";
      borderColor = "border-green-500";
      break;
    case "pending":
      badgeVariant = "processing";
      borderColor = "border-blue-500";
      break;
  }

  // scenarios
  const hasAttachment = !!_case.attachment_url;
  const canAddAttachment =
    !hasAttachment &&
    _case.status !== "answered" &&
    _case.status !== "finished" &&
    session.user.permission === "operator";
  const canViewOnly = !hasAttachment && session.user.permission !== "operator";
  const hasReply = !!_case.reply;

  return (
    <Card className={cn("relative w-fit min-w-[50%] mx-auto", borderColor)}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Review case #{_case.case_id} ({_case.orderId})
          <Badge variant={badgeVariant}>{_case.status.toUpperCase()}</Badge>
        </CardTitle>
        <CardDescription>Review inquiry sent to the customer</CardDescription>
      </CardHeader>
      <CardContent>
        <Input disabled value={_case.orderId} />
        <Textarea disabled value={_case.comment} />

        {canAddAttachment && (
          <>
            <Separator className="my-6" />
            <CaseUploadFile caseId={_case.case_id} />
          </>
        )}
        {hasAttachment && (
          <>
            <Label>Attachment</Label>
            <Image
              src={_case.attachment_url!}
              alt="case image attachment preview"
              width={400}
              height={200}
            />
          </>
        )}
        {canViewOnly && <Label>No attachment added</Label>}

        {hasReply && (
          <>
            <Separator className="my-6" />
            <Label>Reply</Label>
            <Textarea disabled value={_case.reply!} />
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <CaseActionButtons caseData={_case} session={session} />
      </CardFooter>
    </Card>
  );
};

export default page;
