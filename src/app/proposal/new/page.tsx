import ProposalCreateForm from "@/components/forms/proposal-create";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions, getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const page = async ({}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/sign-in");
  }

  const options = await db.proposalOption.findMany({
    where: {
      active: true,
    },
    select: {
      category: true,
      description: true,
      id: true,
    },
  });

  return (
    <Card className="w-fit min-w-[50%] mx-auto">
      <CardHeader>
        <CardTitle>Create new proposal</CardTitle>
        <CardDescription>
          Create a new product proposal alternative to be reviewed by customer
        </CardDescription>
      </CardHeader>
      <ProposalCreateForm user={session.user} proposalOptions={options} />
    </Card>
  );
};

export default page;
