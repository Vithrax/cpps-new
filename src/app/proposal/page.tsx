import { columns } from "@/app/proposal/columns";
import { DataTable } from "@/components/table/data-table";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { getUserAccessData } from "@/lib/fetch-user-access";
import { ProposalColumn } from "@/types/ProposalColumns";
import Link from "next/link";

async function getData(): Promise<ProposalColumn[]> {
  const userAccessList = await getUserAccessData();
  const rawData = await db.proposal.findMany({
    where: {
      order: {
        companyId: {
          in: userAccessList,
        },
      },
    },
    select: {
      created_at: true,
      proposal_id: true,
      status: true,
      order: {
        select: {
          order_id: true,
          external_id: true,
          companyId: true,
        },
      },
      created_by: {
        select: {
          initials: true,
        },
      },
    },
  });

  // flatten the data
  const data = rawData.map(
    ({ created_at, created_by, order, proposal_id, status }) => {
      return {
        created_at,
        proposal_id,
        status,
        order_id: order.order_id,
        external_id: order.external_id,
        companyId: order.companyId,
        initials: created_by.initials,
      };
    }
  );

  return data;
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="sm:container sm:py-10 px-1">
      <DataTable
        columns={columns}
        data={data}
        filterPlaceholder="Filter orders..."
        filterColumnId="order_id"
      />
      <Link href="/proposal/new" className={buttonVariants()}>
        Create new proposal
      </Link>
    </div>
  );
}
