import { buttonVariants } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { db } from "@/lib/db";
import { Order } from "@prisma/client";
import Link from "next/link";
import { getUserAccessData } from "@/lib/fetch-user-access";

async function getData(): Promise<Order[]> {
  const userAccessList = await getUserAccessData();
  const data = await db.order.findMany({
    where: {
      companyId: {
        in: userAccessList,
      },
    },
  });
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
      <Link href="/order/new" className={buttonVariants()}>
        Create new order
      </Link>
    </div>
  );
}
