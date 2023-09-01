import SideMenuLink from "@/components/ui/side-menu";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

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
    <div className="w-full h-full gap-16 grid grid-cols-1 sm:grid-cols-[min-content_1fr] mt-8">
      <aside className="flex sm:flex-col gap-4 sm:gap-0 flex-row w-fit min-w-max">
        <div className="pb-4">
          <h4 className={groupTitleStyle}>Proposal</h4>
          <div className={linkContainerStyle}>
            <SideMenuLink href="/admin/proposal-option">
              All options
            </SideMenuLink>
            <SideMenuLink href="/admin/proposal-option/new">
              Create option
            </SideMenuLink>
          </div>
        </div>
        <div className="pb-4">
          <h4 className={groupTitleStyle}>Users</h4>
          <div className={linkContainerStyle}>
            <SideMenuLink href="/admin/user">All users</SideMenuLink>
          </div>
        </div>
        <div className="pb-4">
          <h4 className={groupTitleStyle}>Companies</h4>
          <div className={linkContainerStyle}>
            <SideMenuLink href="/admin/company">All companies</SideMenuLink>
            <SideMenuLink href="/admin/company/new">
              Create company
            </SideMenuLink>
          </div>
        </div>
      </aside>
      <main className="h-full mt-8 sm:mt-0">{children}</main>
    </div>
  );
};

export default page;
