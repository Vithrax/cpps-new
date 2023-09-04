"use client";

import { cn } from "@/lib/utils";
import { Link } from "nextjs13-progress";
import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, forwardRef } from "react";

interface SideMenuLinkProps
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  children: ReactNode;
}

const SideMenuLink = forwardRef<HTMLAnchorElement, SideMenuLinkProps>(
  ({ className, href, children, ...props }, ref) => {
    const pathname = usePathname();
    const active = pathname === href;

    return (
      <Link
        ref={ref}
        // @ts-expect-error N13Progress lib type error
        href={href}
        className={cn(
          "group flex w-full items-center rounded-md border border-transparent px-2 py-0.5  text-muted-foreground",
          `${active ? "font-medium text-foreground" : "hover:underline"}`
        )}
        {...props}
      >
        {children}
      </Link>
    );
  }
);
SideMenuLink.displayName = "SideMenuLink";

export default SideMenuLink;
