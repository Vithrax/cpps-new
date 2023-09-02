"use client";

import Link from "next/link";
import { Order } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export const columns: ColumnDef<Order>[] = [
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
      const order = row.original;

      return (
        <Link
          href={`/orders/${order.order_id}`}
          className={buttonVariants({ variant: "ghost", size: "xs" })}
        >
          {order.order_id}
        </Link>
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
    accessorKey: "first_product_id",
    header: "First Device No.",
  },
  {
    accessorKey: "second_product_id",
    header: "Second Device No.",
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
