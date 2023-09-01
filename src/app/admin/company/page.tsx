import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { db } from "@/lib/db";
import type { Company } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

async function getData(): Promise<Company[]> {
  const data = await db.company.findMany();
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
        filterColumnId="name"
      />
      <Link href="/admin/company/new" className={buttonVariants()}>
        Add new company
      </Link>
    </div>
  );
}
