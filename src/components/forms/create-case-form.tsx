"use client";

import "@uploadthing/react/styles.css";
import { FC } from "react";
import { CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import {
  CreateCaseRequest,
  CreateCaseValidator,
} from "@/lib/validators/create-case";
import { Textarea } from "../ui/textarea";
import { User } from "next-auth";
import { ToastAction } from "@radix-ui/react-toast";

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
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast({
            title: "Already an open case for this order",
            description: "Close the previous one before opening new case!",
            variant: "destructive",
            action: (
              <ToastAction
                onClick={() => window.open(error.request.statusText)}
                altText="Go to currently open case"
              >
                Check
              </ToastAction>
            ),
          });
        }

        if (error.response?.status === 404) {
          form.setError("order_id", { message: "Order not found!" });

          return toast({
            title: "Order not found.",
            description: "Please verify order number.",
            variant: "destructive",
          });
        }

        return toast({
          title: "There was an error.",
          description: "Case creation failed, try again later.",
          variant: "destructive",
        });
      }
    },
    onSuccess: ({ caseId }: { caseId: number }) => {
      toast({
        description: "Case created successfully",
      });

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