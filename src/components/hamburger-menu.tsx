import { FC } from "react";
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
import Link from "next/link";
import { Session } from "next-auth";

interface HamburgerMenuProps {
  session: Session | null;
}

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
          <DropdownMenuItem>
            <Link href="/order" className="h-full w-full">
              Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/proposal" className="h-full w-full">
              Proposals
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/cases" className="h-full w-full">
              Cases
            </Link>
          </DropdownMenuItem>
          {isAdmin && (
            <DropdownMenuItem>
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
