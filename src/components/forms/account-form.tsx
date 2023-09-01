"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AccountUpdateValidator,
  AccountValidator,
} from "@/lib/validators/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { CardContent, CardFooter } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface AccountFormProps {
  user: Pick<User, "id" | "initials">;
}

const AccountForm: FC<AccountFormProps> = ({ user }) => {
  const router = useRouter();

  // Updating account
  const { isLoading: isUpdatingAccount, mutate: updateAccount } = useMutation({
    mutationFn: async ({ initials }: AccountUpdateValidator) => {
      const payload: AccountUpdateValidator = {
        initials,
      };

      const { data } = await axios.patch("/api/account", payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast({
            title: "Username already taken.",
            description: "Please choose a different username.",
            variant: "destructive",
          });
        }

        return toast({
          title: "There was an error.",
          description: "Initials update failed, try again later.",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        description: "Your username has been updated",
      });

      router.refresh();
    },
  });

  // Deleting account
  const { mutate: deleteAccount, isLoading: isDeletingAccount } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/account`);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast({
          title: "There was an error.",
          description: "Error while deleting account, please try again later.",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        description: "Your account has been deleted.",
      });

      signOut();
    },
  });

  const form = useForm<AccountUpdateValidator>({
    resolver: zodResolver(AccountValidator),
    defaultValues: {
      initials: user.initials!,
    },
  });

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((e) => updateAccount(e))}
            id="my-account-update-form"
          >
            <FormField
              name={"initials"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Initials</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>
                    Initials used by your company
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog>
          <DialogTrigger
            className={buttonVariants({ variant: "softDestructive" })}
          >
            Delete
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogTrigger className={buttonVariants({ variant: "outline" })}>
                Cancel
              </DialogTrigger>
              <Button
                variant="destructive"
                isLoading={isDeletingAccount}
                onClick={() => deleteAccount()}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          variant="outline"
          className="ml-auto mr-2"
          onClick={() => form.reset()}
        >
          Reset
        </Button>
        <Button form="my-account-update-form" isLoading={isUpdatingAccount}>
          Update
        </Button>
      </CardFooter>
    </>
  );
};

export default AccountForm;
