import { redirect } from "next/navigation";
import SideMenuLink from "@/components/side-menu";
import { getAuthSession } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPPS | My account",
};

// styles
const groupTitleStyle = "mb-1 rounded-md px-2 py-1 text-sm font-semibold";
const linkContainerStyle = "grid grid-flow-row auto-rows-max text-sm";

const page = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();
  const isAdmin = session?.user.permission === "admin";

  // admin route is protected
  if (!isAdmin) {
    return redirect("/");
  }

  return (
    <div className="w-full h-full gap-16 grid grid-cols-1 md:grid-cols-[min-content_1fr] mt-8">
      <aside className="flex pb-2 bg-primary-foreground md:bg-transparent md:border-0 md:flex-col w-full rounded-md border justify-around md:justify-normal gap-4 md:gap-0 flex-row md:w-fit min-w-max">
        <div className="md:pb-4">
          <h4 className={groupTitleStyle}>Options</h4>
          <div className={linkContainerStyle}>
            <SideMenuLink href="/admin/proposal-option">List</SideMenuLink>
            <SideMenuLink href="/admin/proposal-option/new">
              Create
            </SideMenuLink>
          </div>
        </div>
        <div className="md:pb-4">
          <h4 className={groupTitleStyle}>Users</h4>
          <div className={linkContainerStyle}>
            <SideMenuLink href="/admin/user">List</SideMenuLink>
          </div>
        </div>
        <div className="md:pb-4">
          <h4 className={groupTitleStyle}>Companies</h4>
          <div className={linkContainerStyle}>
            <SideMenuLink href="/admin/company">List</SideMenuLink>
            <SideMenuLink href="/admin/company/new">Create</SideMenuLink>
          </div>
        </div>
      </aside>
      <main className="h-full">{children}</main>
    </div>
  );
};

export default page;
