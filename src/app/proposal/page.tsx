import { Payment, columns } from './columns';
import { DataTable } from './data-table';
import { faker } from '@faker-js/faker';

type TransactionType = 'pending' | 'processing' | 'success' | 'failed';

async function getData(amount: number = 50): Promise<Payment[]> {
  // Fetch data from your API here.

  // mock data using faker
  return Array.from({ length: amount }).map(() => {
    return {
      id: faker.string.uuid(),
      amount: faker.number.float({ min: 100, max: 9999 }),
      status: faker.helpers.arrayElement<TransactionType>([
        'failed',
        'pending',
        'processing',
        'success',
      ]),
      email: faker.internet.email(),
    };
  });
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
