"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((page) => page !== "");

  let link = "";
  const parsedPages = segments.map((segment) => {
    const name = segment
      .split("-") // split by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
      .join(" "); // join words with spaces

    link = `${link}/${segment}`;

    return {
      href: link,
      name,
    };
  });

  return (
    <div className="mt-2 flex items-center">
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
