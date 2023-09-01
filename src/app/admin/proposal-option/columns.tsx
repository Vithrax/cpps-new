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
import type { ProposalOption } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { ProposalOptionUpdateRequest } from "@/lib/validators/update-proposal-option";

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
    id: "actions",
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
              onClick={() => navigator.clipboard.writeText(option.description)}
            >
              Copy description
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(option.category)}
            >
              Copy category
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/proposal-option/${option.id}`}>
                Statistics
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={option.active ? "text-red-500" : "text-green-500"}
              onClick={handleToggleState}
            >
              {option.active ? "Disable" : "Enable"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
