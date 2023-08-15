"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pages = pathname.split("/").filter((page) => page !== "");

  const parsedPages = pages.map((page) => {
    const name = page
      .split("-") // split by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
      .join(" "); // join words with spaces

    return {
      href: page,
      name,
    };
  });

  return (
    <div className="ml-2 mt-2 flex">
      <Link
        href="/"
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <Home className="h-4 w-4 mr-1" /> Home
      </Link>
      {parsedPages.map((page) => (
        <Link
          key={page.href}
          href={page.href}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          / {page.name}
        </Link>
      ))}
    </div>
  );
};

export default Breadcrumbs;
