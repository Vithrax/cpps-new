import OptionPreview from "@/components/option-preview";
import ProposalActionButtons from "@/components/proposal-action-buttons";
import { Badge, BadgeVariants } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authOptions, getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserAccessData } from "@/lib/fetch-user-access";
import { cn } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

interface pageProps {
  params: {
    slug: string;
  };
}

type Options = {
  left: {
    [key: string]: {
      description: string;
    }[];
  };
  right: {
    [key: string]: {
      description: string;
    }[];
  };
};

const page = async ({ params }: pageProps) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/sign-in");
  }

  const proposal = await db.proposal.findFirst({
    where: {
      proposal_id: +params.slug,
    },
    include: {
      order: {
        select: {
          companyId: true,
          external_id: true,
          enduser_name: true,
          first_product_id: true,
          second_product_id: true,
        },
      },
    },
  });

  const userAccessList = await getUserAccessData(session);

  if (!proposal) {
    return notFound();
  }

  if (!userAccessList.includes(proposal.order.companyId)) {
    redirect("/");
  }

  const count = await db.proposal.count({
    where: {
      orderId: proposal.orderId,
    },
  });

  const options = await db.optionsOnProposal.findMany({
    where: {
      proposalId: +params.slug,
    },
    select: {
      device_side: true,
      option: {
        select: {
          category: true,
          description: true,
        },
      },
    },
  });

  const parsedOptions = options.reduce(
    (acc, option) => {
      const device_side = option.device_side;
      const { description, category } = option.option;
      const formattedCategory =
        category.at(0)?.toUpperCase() + category.slice(1);

      if (acc[device_side][formattedCategory]) {
        acc[device_side][formattedCategory].push({ description });
      } else {
        acc[device_side][formattedCategory] = [{ description }];
      }

      return acc;
    },
    { left: {}, right: {} } as Options
  );

  let badgeVariant: BadgeVariants;
  let borderColor: string = "";
  switch (proposal.status) {
    case "rejected":
      badgeVariant = "destructive";
      borderColor = "border-red-500";
      break;
    case "cancelled":
      badgeVariant = "disabled";
      break;
    case "accepted":
      badgeVariant = "success";
      borderColor = "border-green-500";
      break;
    case "pending":
      badgeVariant = "processing";
      borderColor = "border-blue-500";
      break;
  }

  return (
    <Card className={cn("w-fit min-w-[50%] mx-auto", borderColor)}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Proposal #{count} ({proposal.orderId})
          <Badge variant={badgeVariant}>{proposal.status}</Badge>
        </CardTitle>
        <CardDescription>
          Correct existing order from any mistakes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label>Proposal ID</Label>
        <Input disabled value={proposal.proposal_id} />
        <Label>Order</Label>
        <Input disabled value={proposal.orderId} />
        <Label>External</Label>
        <Input disabled value={proposal.order.external_id || ""} />
        <Label>First device ID</Label>
        <Input disabled value={proposal.order.first_product_id} />
        <Label>Second device ID</Label>
        <Input disabled value={proposal.order.second_product_id || ""} />
        <Separator className="my-4" />
        <div className="flex justify-between gap-4 mt-2">
          <div className="flex flex-col gap-1 w-full">
            {Object.keys(parsedOptions.left).map((category) => (
              <OptionPreview
                key={category}
                category={category}
                options={parsedOptions.left[category]}
              />
            ))}
          </div>
          <div className="flex flex-col gap-1 w-full">
            {Object.keys(parsedOptions.right).map((category) => (
              <OptionPreview
                key={category}
                category={category}
                options={parsedOptions.right[category]}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <ProposalActionButtons proposal={proposal} session={session} />
    </Card>
  );
};

export default page;
