"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserColumns } from "@/types/UserColumns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const columns: ColumnDef<UserColumns>[] = [
  {
    accessorKey: "initials",
    header: "Initials",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Link
          href={`/admin/user/${user.id}`}
          className={buttonVariants({ variant: "ghost", size: "xs" })}
        >
          {user.id}
        </Link>
      );
    },
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
];
