import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { LucideMoveRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const session = await getAuthSession();
  const isAdmin = session?.user.permission === "admin";

  return (
    <>
      <div className="flex items-center flex-col md:flex-row gap-3 p-3 min-h-[50vh] mx-auto w-full">
        <Card className="w-full">
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
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Cases</CardTitle>
            <CardDescription>
              Check, create and reply to inquiries
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Link href="/cases" className={buttonVariants()}>
              Go
              <LucideMoveRight className="ml-1 w-4 l-4" />
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Create orders to use them in proposals and cases
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Link href="/order" className={buttonVariants()}>
              Go
              <LucideMoveRight className="ml-1 w-4 l-4" />
            </Link>
          </CardFooter>
        </Card>
      </div>
      {isAdmin && (
        <div className="w-full flex justify-center">
          <Card className="w-1/2">
            <CardHeader>
              <CardTitle>Admin Panel</CardTitle>
              <CardDescription>
                Users and configuration management
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
      )}
    </>
  );
}
