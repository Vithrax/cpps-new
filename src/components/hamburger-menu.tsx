import type { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { Link } from "nextjs13-progress";
import { MenuLink } from "@/types/MenuLink";
import type { Session } from "next-auth";

interface HamburgerMenuProps {
  session: Session | null;
}

const navigation: MenuLink[] = [
  {
    href: "/orders",
    label: "Order",
  },
  {
    href: "/cases",
    label: "Cases",
  },
  {
    href: "/proposals",
    label: "Proposals",
  },
];

const HamburgerMenu: FC<HamburgerMenuProps> = async ({ session }) => {
  if (!session) return;
  const isAdmin = session.user.permission === "admin";

  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Pages</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {navigation.map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={item.href}>{item.label}</Link>
            </DropdownMenuItem>
          ))}
          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link href="/admin" className="h-full w-full text-red-500">
                Admin Panel
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HamburgerMenu;
