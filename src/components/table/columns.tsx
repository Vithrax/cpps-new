'use client';

import { type BadgeVariants } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { type Order } from '@/types/order-data-tab';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const order = row.original;

      let variant: BadgeVariants;
      switch (order.status) {
        case 'approved':
          variant = 'success';
          break;
        case 'cancelled':
          variant = 'disabled';
          break;
        case 'pending':
          variant = 'processing';
          break;
        case 'rejected':
          variant = 'destructive';
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
    accessorKey: 'client',
    header: 'Client Number',
  },
  {
    accessorKey: 'internalId',
    header: 'Internal ID',
  },
  {
    accessorKey: 'externalId',
    header: 'External ID',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'age',
    cell: ({ row }) => {
      const old = row.original.age > 24 ? 'text-red-500' : '';
      return <div className={cn('ml-2', old)}>{row.original.age}</div>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Age
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const proposal = row.original;

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
                navigator.clipboard.writeText(`${proposal.internalId}`)
              }
            >
              Copy internal ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(`${proposal.externalId}`)
              }
            >
              Copy external ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Proposal</DropdownMenuLabel>
            <DropdownMenuItem>Accept</DropdownMenuItem>
            <DropdownMenuItem>Cancel</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
