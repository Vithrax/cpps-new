import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { buttonVariants } from "./ui/button";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { db } from "@/lib/db";
import { FC } from "react";
import { getUserAccessData } from "@/lib/fetch-user-access";
import { Label } from "./ui/label";
import Link from "next/link";
import type { Session } from "next-auth";

interface NavNotificationsProps {
  session: Session | null;
}

const NavNotifications: FC<NavNotificationsProps> = async ({ session }) => {
  if (!session) return;

  const { permission } = session.user;
  const accessList = await getUserAccessData(session);

  const caseFilter = permission === "operator" ? "finished" : "pending";
  const proposalFilter = permission === "operator" ? "accepted" : "pending";

  const countCases = await db.case.count({
    where: {
      status: caseFilter,
      order: {
        companyId: {
          in: accessList,
        },
      },
    },
  });

  const countProposals = await db.proposal.count({
    where: {
      status: proposalFilter,
      order: {
        companyId: {
          in: accessList,
        },
      },
    },
  });

  const hasNotifications = countCases + countProposals > 0;

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({ size: "icon", variant: "ghost" }),
          "mr-3 relative"
        )}
      >
        <Bell className="h-5 w-5 " />
        {hasNotifications && (
          <div className="bg-red-500 rounded-full absolute top-0 right-0 m-2 h-2 w-2"></div>
        )}
        <span className="sr-only">Notifications</span>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col mt-2 w-fit">
        <Label>Notifications</Label>
        <Separator className="my-2" />
        {!hasNotifications && (
          <div className="text-center text-muted-foreground">
            Nothing to show. All clear!
          </div>
        )}
        {countCases > 0 && (
          <Link
            href="/cases"
            className="hover:bg-primary-foreground px-2 py-1 rounded-md"
          >
            {countCases} cases pending
          </Link>
        )}
        {countProposals > 0 && (
          <Link
            href="/proposals"
            className="hover:bg-primary-foreground px-2 py-1 rounded-md"
          >
            {countProposals} proposals pending
          </Link>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NavNotifications;
