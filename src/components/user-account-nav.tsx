import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/user-avatar";
import type { MenuLink } from "@/types/MenuLink";
import type { User } from "next-auth";
import type { FC } from "react";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
}

const navigation: MenuLink[] = [
  {
    href: "/orders/new",
    label: "Create new order",
  },
  {
    href: "/cases/new",
    label: "Open new case",
  },
  {
    href: "/proposals/new",
    label: "Create proposal",
  },
  {
    href: "/account",
    label: "My account",
  },
];

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-8 w-8"
          user={{
            name: user.name || null,
            image: user.image || null,
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-semibold">{user.name}</p>}
            {user.email && (
              <p className="font-medium w-56 truncate text-sm text-zinc-700">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />
        {navigation.map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link href={item.href}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `/sign-in`,
            });
          }}
          className="cursor-pointer"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
