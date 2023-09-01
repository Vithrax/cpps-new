import Link from "next/link";
import ModeToggle from "@/components/ui/theme-switch";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "@/components/user-account-nav";
import Logo from "./logo";
import NavNotifications from "./nav-notifications";
import HamburgerMenu from "./hamburger-menu";
import NavLinks from "./nav-links";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <header className="fixed top-0 border-b w-full z-10">
      <nav className="items-center container mx-auto flex justify-between px-4 py-3 backdrop-blur-sm">
        <HamburgerMenu session={session} />
        <Link href="/" className="mr-4">
          <Logo />
        </Link>
        <NavLinks session={session} />
        <div className="flex items-center">
          <div className="hidden md:block">
            <ModeToggle />
            <NavNotifications />
          </div>
          {!session ? (
            <Link className={buttonVariants()} href="/sign-in">
              Sign in
            </Link>
          ) : (
            <UserAccountNav user={session.user} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
