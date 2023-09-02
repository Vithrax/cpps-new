import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import SignUp from "@/components/sign-up";

const Page = async () => {
  const session = await getAuthSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="w-full grid place-items-center">
      <SignUp />
    </div>
  );
};

export default Page;
