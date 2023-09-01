import AccessManager from "@/components/access-manager";
import AdminEditUserForm from "@/components/forms/admin-edit-user-form";
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
  const id = params.slug;

  const user = await db.user.findFirst({
    where: {
      id,
    },
    include: {
      UserAccess: {
        select: {
          companyId: true,
          id: true,
        },
      },
    },
  });

  if (!user) {
    return notFound();
  }

  const companies = await db.company.findMany({
    select: {
      id: true,
    },
  });

  const companiesIdArray = companies.map((company) => company.id);

  if (!user) {
    return notFound();
  }

  return (
    <Card className="w-fit min-w-[400px]">
      <CardHeader>
        <CardTitle>
          {user.name} ({user.initials!.toUpperCase()})
        </CardTitle>
        <CardDescription>View & edit details of this account</CardDescription>
      </CardHeader>
      <CardContent>
        <Label>User ID</Label>
        <Input disabled value={user.id || ""} />
        <p className="text-sm text-muted-foreground mb-2">
          Read only - server logic
        </p>
        <Label>Email</Label>
        <Input disabled value={user.email || ""} />
        <p className="text-sm text-muted-foreground mb-2">
          Read only - server logic
        </p>
      </CardContent>
      <AccessManager
        companies={companiesIdArray}
        userAccess={user.UserAccess}
        userId={user.id}
      />
      <AdminEditUserForm user={user} companies={companiesIdArray} />
    </Card>
  );
};

export default page;
