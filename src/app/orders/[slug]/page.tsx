import { notFound } from "next/navigation";
import UpdateOrderForm from "@/components/forms/update-order";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/db";

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const companies = await db.company.findMany({
    select: {
      id: true,
    },
  });

  const companiesArray = companies.map((company) => company.id);
  const order = await db.order.findFirst({
    where: {
      order_id: params.slug,
    },
  });

  if (!order) {
    return notFound();
  }

  return (
    <Card className="w-fit min-w-[50%] mx-auto">
      <CardHeader>
        <CardTitle>Edit order</CardTitle>
        <CardDescription>
          Correct existing order from any mistakes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label>Order ID</Label>
        <Input disabled value={order.order_id} />
        <p className="text-sm text-muted-foreground mb-2">
          Read only - server logic
        </p>
      </CardContent>
      <UpdateOrderForm companies={companiesArray} order={order} />
    </Card>
  );
};

export default page;
