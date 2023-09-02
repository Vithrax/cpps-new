"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { CompanyColumns } from "@/types/CompanyColumns";

export const columns: ColumnDef<CompanyColumns>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const company = row.original;

      return (
        <Link
          href={`/admin/company/${company.id}`}
          className={buttonVariants({ variant: "ghost", size: "xs" })}
        >
          {company.id}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "brand",
    header: "Company Brand",
  },
];
