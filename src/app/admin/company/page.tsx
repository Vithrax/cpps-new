import Link from "next/link";
import { db } from "@/lib/db";
import { DataTable } from "@/components/table/data-table";
import { buttonVariants } from "@/components/ui/button";
import { columns } from "./columns";
import type { Company } from "@prisma/client";

async function getData(): Promise<Company[]> {
  const data = await db.company.findMany();
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
        filterColumnId="name"
      />
      <Link href="/admin/company/new" className={buttonVariants()}>
        Add new company
      </Link>
    </div>
  );
}
