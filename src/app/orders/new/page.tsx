import { db } from "@/lib/db";
import CreateOrderForm from "@/components/forms/create-order";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = async ({}) => {
  const companies = await db.company.findMany({
    select: {
      id: true,
    },
  });
  const companiesArray = companies.map((company) => company.id);

  return (
    <Card className="w-fit min-w-[50%] mx-auto">
      <CardHeader>
        <CardTitle>Create order</CardTitle>
        <CardDescription>
          Create a new order that will be used on proposals and cases
        </CardDescription>
      </CardHeader>
      <CreateOrderForm companies={companiesArray} />
    </Card>
  );
};

export default page;
