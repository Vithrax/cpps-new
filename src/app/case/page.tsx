import { columns } from '@/components/table/columns';
import { type Order } from '@/types/order-data-tab';
import { DataTable } from '@/components/table/data-table';
import { faker } from '@faker-js/faker';

async function getData(amount: number = 50): Promise<Order[]> {
  // Fetch here

  // TEMP: mock data w/ faker
  return Array.from({ length: amount }).map(() => {
    return {
      id: faker.number.int(1000),
      client: faker.number.int({ min: 10002, max: 75732 }),
      status: faker.helpers.arrayElement<Order['status']>([
        'approved',
        'pending',
        'cancelled',
        'rejected',
      ]),
      externalId: 'SOR0000' + faker.number.int({ min: 1000, max: 9999 }),
      internalId: 'PSOA' + faker.number.int({ min: 1000, max: 9999 }),
      email: faker.string.alpha(4).toLowerCase() + '@demant.com',
      age: faker.number.int({ min: 1, max: 143 }),
    };
  });
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
