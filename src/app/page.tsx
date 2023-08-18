import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LucideMoveRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 mx-auto w-fit">
      <Card>
        <CardHeader>
          <CardTitle>Proposals</CardTitle>
          <CardDescription>View and process all proposals</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Link href="/proposal" className={buttonVariants()}>
            Go
            <LucideMoveRight className="ml-1 w-4 l-4" />
          </Link>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Cases</CardTitle>
          <CardDescription>
            Check, create and reply to inquiries
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Link href="/inquiry" className={buttonVariants()}>
            Go
            <LucideMoveRight className="ml-1 w-4 l-4" />
          </Link>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Admin Panel</CardTitle>
          <CardDescription>
            Administration panel for handling portal functionalities
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Link href="/admin" className={buttonVariants()}>
            Go
            <LucideMoveRight className="ml-1 w-4 l-4" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
