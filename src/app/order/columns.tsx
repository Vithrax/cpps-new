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
import { Button } from "@/components/ui/button";
import { Order } from "@prisma/client";
import Link from "next/link";

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
              <Link href={`/order/${order.order_id}`} className="w-full">
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
