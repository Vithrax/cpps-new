"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pages = pathname.split("/").filter((page) => page !== "");

  let link = "";
  const parsedPages = pages.map((page) => {
    const name = page
      .split("-") // split by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
      .join(" "); // join words with spaces

    link = `${link}/${page}`;

    return {
      href: link,
      name,
    };
  });

  return (
    <div className="ml-2 mt-2 flex items-center">
      <Link
        href="/"
        className={buttonVariants({ variant: "ghost", size: "xs" })}
      >
        <Home className="h-4 w-4 mr-1" /> Home
      </Link>
      {parsedPages.map((page) => (
        <>
          <ChevronRight className="h-4 w-4" />
          <Link
            key={page.href}
            href={page.href}
            className={buttonVariants({ variant: "ghost", size: "xs" })}
          >
            {page.name}
          </Link>
        </>
      ))}
    </div>
  );
};

export default Breadcrumbs;
