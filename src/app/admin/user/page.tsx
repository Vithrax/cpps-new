import { columns } from "./columns";
import { type UserColumns } from "@/types/UserColumns";
import { DataTable } from "@/components/table/data-table";
import { db } from "@/lib/db";
import Text from "@/components/ui/text";

async function getData(): Promise<UserColumns[]> {
  // Fetch here
  const data = await db.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      initials: true,
      permission_level: true,
      UserAccess: {
        select: {
          companyId: true,
        },
      },
    },
  });

  return data;
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="sm:container sm:py-10 px-1">
      <Text variant="h3">All users</Text>
      <DataTable
        columns={columns}
        data={data}
        filterPlaceholder="Filter users by initials..."
        filterColumnId="initials"
      />
    </div>
  );
}
