import AccountForm from "@/components/forms/account-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { authOptions, getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Building2, FileKey2, User } from "lucide-react";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/sign-in");
  }

  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  return (
    <>
      <Card className="w-fit mx-auto">
        <CardHeader>
          <CardTitle>My Account</CardTitle>
          <CardDescription>
            Here you can view details regarding your account and update some
            options if needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Card className="flex px-2 justify-around w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1 py-6">
                  <Building2 className="w-6 h-6" />
                  {user?.companyId || "No company"}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Parent Company</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1">
                  <User className="w-6 h-6" />
                  {user?.name || "Name"}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Account name</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1">
                  <FileKey2 className="w-6 h-6" />
                  {user?.permission_level}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Permission level</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Card>
        </CardContent>
        <AccountForm
          user={{
            id: session.user.id,
            initials: session.user.initials!,
          }}
        />
      </Card>
    </>
  );
};

export default Page;
