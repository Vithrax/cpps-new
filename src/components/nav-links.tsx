"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { FC } from "react";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  session: Session | null;
}

const NavLinks: FC<NavLinksProps> = ({ session }) => {
  const pathname = usePathname();

  if (!session) return;
  const isAdmin = session.user.permission === "admin";

  console.log(pathname);

  const activeClass = (path: string) => {
    if (pathname.startsWith(path)) return "bg-primary/10";

    return "";
  };

  return (
    <div className="items-center mr-auto hidden md:flex">
      <Button variant="ghost" className={activeClass("/order")}>
        <Link href="/order">Orders</Link>
      </Button>
      <Button variant="ghost" className={activeClass("/proposal")}>
        <Link href="/proposal">Proposals</Link>
      </Button>
      <Button variant="ghost" className={activeClass("/cases")}>
        <Link href="/cases">Cases</Link>
      </Button>
      {isAdmin && (
        <Button variant="ghost" className={activeClass("/admin")}>
          <Link href="/admin">Admin panel</Link>
        </Button>
      )}
    </div>
  );
};

export default NavLinks;
