'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, buttonVariants } from './ui/button';
import type { FC } from 'react';
import type { Session } from 'next-auth';
import { cn } from '@/lib/utils';

interface NavLinksProps {
  session: Session | null;
}

const NavLinks: FC<NavLinksProps> = ({ session }) => {
  const pathname = usePathname();

  if (!session) return;
  const isAdmin = session.user.permission === 'admin';

  const activeClass = (path: string) => {
    if (pathname.startsWith(path)) return 'bg-primary/10';

    return '';
  };

  return (
    <div className="items-center mr-auto hidden md:flex">
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          activeClass('/orders')
        )}
        href="/orders"
      >
        Orders
      </Link>
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          activeClass('/proposals')
        )}
        href="/proposals"
      >
        Proposals
      </Link>
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          activeClass('/cases')
        )}
        href="/cases"
      >
        Cases
      </Link>
      {isAdmin && (
        <Link
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            activeClass('/admin')
          )}
          href="/admin"
        >
          Admin Panel
        </Link>
      )}
    </div>
  );
};

export default NavLinks;
