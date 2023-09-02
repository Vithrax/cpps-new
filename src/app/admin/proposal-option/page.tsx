import Link from "next/link";
import { db } from "@/lib/db";
import { DataTable } from "@/components/table/data-table";
import { buttonVariants } from "@/components/ui/button";
import { columns } from "./columns";
import type { ProposalOption } from "@prisma/client";

async function getData(): Promise<ProposalOption[]> {
  const data = await db.proposalOption.findMany();
  return data;
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="sm:container sm:py-10 px-1">
      <DataTable
        columns={columns}
        data={data}
        filterPlaceholder="Filter descriptions..."
        filterColumnId="description"
      />
      <Link href="/admin/proposal-option/new" className={buttonVariants()}>
        Add new option
      </Link>
    </div>
  );
}
