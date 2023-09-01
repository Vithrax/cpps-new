import Text from "@/components/ui/text";

const page = ({}) => {
  return (
    <>
      <Text variant="h3">Admin Panel</Text>
      <Text>
        Welcome to CPPS control panel. Here you can modify users, clients and
        proposal configs.
        <br />
        Select category from a side panel to continue.
      </Text>
    </>
  );
};

export default page;
