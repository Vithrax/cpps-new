import CreateCaseForm from "@/components/forms/create-case-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async ({}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/sign-in");
  }

  return (
    <Card className="w-fit min-w-[50%] mx-auto">
      <CardHeader>
        <CardTitle>Create new case</CardTitle>
        <CardDescription>
          Send an inquiry to customer using case in CPPS
        </CardDescription>
      </CardHeader>
      <CreateCaseForm user={session.user} />
    </Card>
  );
};

export default page;
