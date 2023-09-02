import Link from "next/link";
import { Order } from "@prisma/client";
import { db } from "@/lib/db";
import { getUserAccessData } from "@/lib/fetch-user-access";
import { buttonVariants } from "@/components/ui/button";
import { DataTable } from "@/components/table/data-table";
import { columns } from "./columns";

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
      <Link href="/orders/new" className={buttonVariants()}>
        Create new order
      </Link>
    </div>
  );
}
