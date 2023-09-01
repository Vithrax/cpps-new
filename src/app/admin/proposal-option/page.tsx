import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { db } from "@/lib/db";
import type { ProposalOption } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

async function getData(): Promise<ProposalOption[]> {
  const data = await db.proposalOption.findMany();
  return data;
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
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
