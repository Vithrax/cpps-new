"use client";

import { Link } from "nextjs13-progress";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { type BadgeVariants } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProposalColumn } from "@/types/ProposalColumns";

export const columns: ColumnDef<ProposalColumn>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const proposal = row.original;

      return (
        <Link
          href={"/proposals/" + proposal.proposal_id}
          className={buttonVariants({ variant: "ghost", size: "xs" })}
        >
          {proposal.proposal_id}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const order = row.original;

      let variant: BadgeVariants;
      switch (order.status) {
        case "accepted":
          variant = "success";
          break;
        case "cancelled":
          variant = "disabled";
          break;
        case "pending":
          variant = "processing";
          break;
        case "rejected":
          variant = "destructive";
          break;
      }

      return (
        <Badge variant={variant} className="mx-auto">
          {order.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "companyId",
    header: "Company ID",
  },
  {
    accessorKey: "order_id",
    header: "Internal ID",
  },
  {
    accessorKey: "external_id",
    header: "External ID",
  },
  {
    accessorKey: "initials",
    header: "Initials",
  },
  {
    accessorKey: "created_at",
    header: "Created Date",
    cell: ({ row }) => {
      const proposal = row.original;

      return proposal.created_at.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
];
