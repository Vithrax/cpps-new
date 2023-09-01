import UpdateCompanyForm from "@/components/forms/update-company";
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
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const id = +params.slug;

  const company = await db.company.findFirst({
    where: {
      id,
    },
  });

  if (!company) {
    return notFound();
  }

  return (
    <Card className="w-fit min-w-[400px]">
      <CardHeader>
        <CardTitle>
          {company.name} ({company.id})
        </CardTitle>
        <CardDescription>View & edit details of this Company</CardDescription>
      </CardHeader>
      <CardContent>
        <Label>ID</Label>
        <Input disabled value={company.id || ""} />
        <p className="text-sm text-muted-foreground mb-2">
          Read only - server logic
        </p>
      </CardContent>
      <UpdateCompanyForm company={company} />
    </Card>
  );
};

export default page;
