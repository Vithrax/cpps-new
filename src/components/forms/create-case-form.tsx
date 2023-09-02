"use client";

import axios from "axios";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { onMutationError } from "@/utils/mutation-error";
import {
  CreateCaseRequest,
  CreateCaseValidator,
} from "@/lib/validators/create-case";
import "@uploadthing/react/styles.css";
import type { User } from "next-auth";

interface CreateCaseFormProps {
  user: User;
}

const CreateCaseForm: FC<CreateCaseFormProps> = ({ user }) => {
  const router = useRouter();
  const form = useForm<CreateCaseRequest>({
    resolver: zodResolver(CreateCaseValidator),
  });

  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: async ({ comment, order_id }: CreateCaseRequest) => {
      const payload: CreateCaseRequest = {
        comment,
        order_id,
      };

      const { data } = await axios.post("/api/case/", payload);
      return data;
    },
    onError: onMutationError,
    onSuccess: ({ caseId }: { caseId: number }) => {
      toast({
        description: "Case created successfully",
      });

      router.refresh();
      router.push("/cases/" + caseId);
    },
  });

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            id="create-order-form"
            onSubmit={form.handleSubmit((e) => createOrder(e))}
          >
            <FormField
              name="order_id"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Type here..." {...field} />
                  </FormControl>
                  <FormDescription>Order that case refers to</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="comment"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Comment / Question</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[200px]"
                      placeholder="Type your inquiry here."
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    This is a text that customer will receive and will have to
                    reply to
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={() => form.reset()}
          className="ml-auto mr-2"
        >
          Clear
        </Button>
        <Button isLoading={isLoading} form="create-order-form">
          Create
        </Button>
      </CardFooter>
    </>
  );
};

export default CreateCaseForm;
