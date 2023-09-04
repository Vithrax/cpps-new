"use client";

import axios from "axios";
import { Link } from "nextjs13-progress";
import { ColumnDef } from "@tanstack/react-table";
import { ProposalOptionUpdateRequest } from "@/lib/validators/proposal-option-create";
import { ArrowUpDown } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import type { ProposalOption } from "@prisma/client";

export const columns: ColumnDef<ProposalOption>[] = [
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
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const option = row.original;
      const text = option.active ? "Active" : "Disabled";

      return (
        <Badge variant={option.active ? "success" : "destructive"}>
          {text}
        </Badge>
      );
    },
  },
  {
    id: "toggle",
    header: "State",
    cell: ({ row }) => {
      const option = row.original;

      const handleToggleState = async () => {
        try {
          const payload: ProposalOptionUpdateRequest = {
            id: option.id,
            state: !option.active,
          };
          await axios.patch("/api/proposal-option", payload);

          toast({
            title: "Option status updated!",
          });

          location.reload();
        } catch (error) {
          toast({
            title: "Something went wrong",
            description:
              "Error while changing option status, please try again later",
            variant: "destructive",
          });
        }
      };

      return (
        <Button
          variant="ghost"
          className={
            option.active
              ? "text-red-500 hover:text-red-400"
              : "text-green-500 hover:text-green-400"
          }
          onClick={handleToggleState}
        >
          {option.active ? "Disable" : "Enable"}
        </Button>
      );
    },
  },
];
