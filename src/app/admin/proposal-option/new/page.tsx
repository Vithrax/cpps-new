import ProposalOptionForm from "@/components/forms/proposal-option-form";
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
        <CardTitle>Create new proposal option</CardTitle>
        <CardDescription>
          Create a new option that can be used on any proposal from now on.
        </CardDescription>
      </CardHeader>
      <ProposalOptionForm />
    </Card>
  );
};

export default page;
