import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();

  // route only for logged users
  if (!session) redirect(authOptions.pages?.signIn || "/sign-in");

  return <>{children}</>;
};

export default layout;
