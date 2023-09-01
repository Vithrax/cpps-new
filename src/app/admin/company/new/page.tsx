import NewCompanyForm from "@/components/forms/new-company-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = () => {
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Create new company</CardTitle>
        <CardDescription>
          Add a new firm in the database that can be used to create proposals
          and cases
        </CardDescription>
      </CardHeader>
      <NewCompanyForm />
    </Card>
  );
};

export default page;
