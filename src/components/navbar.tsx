import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { ModeToggle } from "@/components/ui/theme-switch";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "@/components/user-account-nav";
import Logo from "./logo";

const Navbar = async () => {
  const session = await getAuthSession(); // for RFC

  return (
    <header className="top-0 border-b w-full">
      <nav className="items-center max-w-7xl mx-auto flex justify-between px-4 py-3">
        <Link href="/">
          <Logo />
        </Link>
        <div className="items-center justify-center gap-1 ml-auto mr-3 hidden sm:flex">
          <a
            href="https://github.com/Vithrax"
            className={buttonVariants({ size: "icon", variant: "outline" })}
            target="_blank"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/adrian-gajdulewicz-50137518b/"
            className={buttonVariants({ size: "icon", variant: "outline" })}
            target="_blank"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <ModeToggle />
        </div>
        {!session ? (
          <Link className={buttonVariants()} href="/sign-in">
            Sign in
          </Link>
        ) : (
          <UserAccountNav user={session.user} />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
