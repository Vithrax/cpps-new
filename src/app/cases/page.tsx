import Link from "next/link";
import { db } from "@/lib/db";
import { DataTable } from "@/components/table/data-table";
import { buttonVariants } from "@/components/ui/button";
import { CaseColumn } from "@/types/CaseColumns";
import { columns } from "./columns";

async function getData(): Promise<CaseColumn[]> {
  const rawCases = await db.case.findMany({
    select: {
      created_at: true,
      status: true,
      case_id: true,
      created_by: {
        select: {
          initials: true,
        },
      },
      order: {
        select: {
          companyId: true,
          enduser_name: true,
          external_id: true,
          order_id: true,
        },
      },
    },
  });

  const parsedCases = rawCases.map(
    ({ created_at, created_by, order, status, case_id }) => {
      return {
        created_at,
        status,
        case_id,
        initials: created_by.initials,
        companyId: order.companyId,
        enduser_name: order.enduser_name,
        external_id: order.external_id,
        order_id: order.order_id,
      };
    }
  );

  return parsedCases;
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="sm:container sm:py-10 px-1">
      <DataTable
        columns={columns}
        data={data}
        filterColumnId="order_id"
        filterPlaceholder="Filter cases..."
      />
      <Link href="/cases/new" className={buttonVariants()}>
        Create new case
      </Link>
    </div>
  );
}
