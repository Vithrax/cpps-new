"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { CaseColumn } from "@/types/CaseColumns";
import { Badge, BadgeVariants } from "@/components/ui/badge";

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
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.order_id)}
            >
              Copy internal ID
            </DropdownMenuItem>
            {order.external_id && (
              <DropdownMenuItem
                onClick={() =>
                  // ? not sure why but typescript sees external id as possibly null
                  navigator.clipboard.writeText(order.external_id!)
                }
              >
                Copy external ID
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/cases/${order.order_id}`} className="w-full">
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
