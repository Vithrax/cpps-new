"use client";

import { FC } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Icons } from "./icons";

interface SignUpProps {}

const SignUp: FC<SignUpProps> = ({}) => {
  return (
    <Card className="w-full mx-4 mt-20 sm:w-[400px]">
      <CardHeader>
        <CardTitle>Login to CPPS</CardTitle>
        <CardDescription>
          You can create account or login to existing one using Google
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={() => signIn("google")}>
          <Icons.google className="w-4 h-4 mr-1.5" /> Login with Google
        </Button>
      </CardContent>
      <CardFooter>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Back
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
