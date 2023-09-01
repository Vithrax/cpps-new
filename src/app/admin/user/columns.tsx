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
import { UserColumns } from "@/types/UserColumns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const columns: ColumnDef<UserColumns>[] = [
  {
    accessorKey: "initials",
    header: "Initials",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Username",
  },
  {
    accessorKey: "permission_level",
    header: "Permission level",
  },
  {
    accessorKey: "access",
    header: "Permissions",
    cell: ({ row }) => {
      const user = row.original;

      if (user.permission_level === "admin") {
        return <div>Administration</div>;
      }

      if (user.UserAccess.length === 0) {
        return <div>No permissions.</div>;
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {user.UserAccess.map((clientNo) => (
            <Badge className="flex justify-center" key={clientNo.companyId}>
              {clientNo.companyId}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
              onClick={() =>
                navigator.clipboard.writeText((user.name || user.id)!)
              }
            >
              Copy name
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email || "")}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/admin/user/${user.id}`} className="w-full">
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
