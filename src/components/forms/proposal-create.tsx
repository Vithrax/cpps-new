"use client";

import "@uploadthing/react/styles.css";
import { FC, useState } from "react";
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
import { User } from "next-auth";
import { ToastAction } from "@radix-ui/react-toast";
import { ProposalOption } from "@prisma/client";
import OptionSelector from "../option-selector";
import { Separator } from "../ui/separator";
import {
  CreateProposalForm,
  CreateProposalFormRequest,
  CreateProposalRequest,
  CreateProposalValidator,
} from "@/lib/validators/proposal-create";

interface ProposalCreateFormProps {
  user: User;
  proposalOptions: Omit<ProposalOption, "active">[];
}

type SortedOptions = {
  [category: string]: {
    description: string;
    id: number;
  }[];
};

type SelectedOptionData = {
  left: number[];
  right: number[];
};

const ProposalCreateForm: FC<ProposalCreateFormProps> = ({
  user,
  proposalOptions,
}) => {
  const router = useRouter();
  const form = useForm<CreateProposalFormRequest>({
    resolver: zodResolver(CreateProposalForm),
  });

  const [values, setValues] = useState<SelectedOptionData>({
    left: [],
    right: [],
  });

  const addOption = (n: number, side: "left" | "right") => {
    setValues((prev) => {
      if (side === "left") {
        return {
          ...prev,
          left: [...prev.left, n],
        };
      } else {
        return {
          ...prev,
          right: [...prev.right, n],
        };
      }
    });
  };

  const removeOption = (n: number, side: "left" | "right") => {
    setValues((prev) => {
      if (side === "left") {
        return {
          ...prev,
          left: prev.left.filter((v) => v !== n),
        };
      } else {
        return {
          ...prev,
          right: prev.right.filter((v) => v !== n),
        };
      }
    });
  };

  const sortedOptions = proposalOptions.reduce((acc, option) => {
    const category =
      option.category.at(0)?.toUpperCase() + option.category.slice(1);

    if (acc[category]) {
      acc[category].push({
        description: option.description,
        id: option.id,
      });
    } else {
      acc[category] = [
        {
          description: option.description,
          id: option.id,
        },
      ];
    }

    return acc;
  }, {} as SortedOptions);

  const { mutate: createProposal, isLoading } = useMutation({
    mutationFn: async ({ orderId }: CreateProposalFormRequest) => {
      const payload: CreateProposalRequest = {
        orderId,
        left_options: values.left,
        right_options: values.right,
      };

      const { data } = await axios.post("/api/proposal/", payload);
      return data;
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast({
            title: "Already an open proposal for this order",
            description: "Close the previous one before opening new proposal!",
            variant: "destructive",
            action: (
              <ToastAction
                onClick={() => window.open(error.request.statusText)}
                altText="Go to currently open proposal"
              >
                Check
              </ToastAction>
            ),
          });
        }

        if (error.response?.status === 401) {
          return toast({
            title: "Unauthorized.",
            description: "You are not allowed to perform this action!",
            variant: "destructive",
          });
        }

        if (error.response?.status === 404) {
          form.setError("orderId", { message: "Order not found!" });

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
    onSuccess: () => {
      toast({
        description: "Case created successfully",
      });

      router.push("/proposal/");
      router.refresh();
    },
  });

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            id="create-proposal-form"
            onSubmit={form.handleSubmit((e) => createProposal(e))}
          >
            <FormField
              name="orderId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Type here..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Order that proposal refers to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Separator className="my-4" />
        {Object.keys(sortedOptions).map((category) => {
          const options = sortedOptions[category];
          return (
            <div key={category} className="flex justify-between gap-4 mt-2">
              <OptionSelector
                side="left"
                category={category}
                options={options}
                addOption={addOption}
                removeOption={removeOption}
              />
              <OptionSelector
                side="right"
                category={category}
                options={options}
                addOption={addOption}
                removeOption={removeOption}
              />
            </div>
          );
        })}
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
        <Button isLoading={isLoading} form="create-proposal-form">
          Create
        </Button>
      </CardFooter>
    </>
  );
};

export default ProposalCreateForm;
