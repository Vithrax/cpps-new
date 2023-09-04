"use client";

import { Link } from "nextjs13-progress";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge, BadgeVariants } from "@/components/ui/badge";
import { CaseColumn } from "@/types/CaseColumns";

export const columns: ColumnDef<CaseColumn>[] = [
  {
    accessorKey: "order_id",
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
      const caseData = row.original;

      return (
        <Link
          href={"/cases/" + caseData.case_id}
          className={buttonVariants({ variant: "ghost", size: "xs" })}
        >
          {caseData.order_id}
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
        case "answered":
          variant = "success";
          break;
        case "pending":
          variant = "processing";
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
    header: "Company",
  },
  {
    accessorKey: "external_id",
    header: "External No",
  },
  {
    accessorKey: "enduser_name",
    header: "End user",
  },
  {
    accessorKey: "initials",
    header: "Creator Initials",
  },
  {
    accessorKey: "created_at",
    header: "Created Date",
    cell: ({ row }) => {
      const order = row.original;

      return order.created_at.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
];
