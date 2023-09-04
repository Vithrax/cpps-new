"use client";

import axios from "axios";
import type { FC } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InitialsUpdateRequest,
  InitialsUpdateValidator,
} from "@/lib/validators/initials-update";
import { onMutationError } from "@/utils/mutation-error";
import type { User } from "@prisma/client";

interface AccountFormProps {
  user: Pick<User, "id" | "initials">;
}

const AccountForm: FC<AccountFormProps> = ({ user }) => {
  const router = useRouter();

  // Updating account
  const { isLoading: isUpdatingAccount, mutate: updateAccount } = useMutation({
    mutationFn: async ({ initials }: InitialsUpdateRequest) => {
      const payload: InitialsUpdateRequest = {
        initials,
      };

      const { data } = await axios.patch("/api/account", payload);
      return data;
    },
    onError: onMutationError,
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
    onError: onMutationError,
    onSuccess: () => {
      toast({
        description: "Your account has been deleted.",
      });

      signOut();
    },
  });

  const form = useForm<InitialsUpdateRequest>({
    resolver: zodResolver(InitialsUpdateValidator),
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
