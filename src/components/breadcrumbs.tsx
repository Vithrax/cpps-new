"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { capitalize } from "@/utils/string";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((page) => page !== "");

  let link = "";
  const parsedPages = segments.map((segment) => {
    const name = segment
      .split("-")
      .map((word) => capitalize(word))
      .join(" ");

    link = `${link}/${segment}`;

    return {
      href: link,
      name,
    };
  });

  // don't render on the main page
  if (segments.length === 0) return;

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
