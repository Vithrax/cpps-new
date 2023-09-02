"use client";

import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { OptionCategory, type ProposalOption } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  CreateProposalOptionValidator,
  ProposalOptionCreateRequest,
} from "@/lib/validators/new-proposal-option";
import { cn } from "@/lib/utils";
import { onMutationError } from "@/utils/mutation-error";

const ProposalOptionForm = () => {
  const router = useRouter();
  const categories = Object.keys(
    OptionCategory
  ) as ProposalOption["category"][];

  const form = useForm<ProposalOptionCreateRequest>({
    resolver: zodResolver(CreateProposalOptionValidator),
    defaultValues: {
      category: "reason",
      description: "",
    },
  });

  const { mutate: createOption, isLoading } = useMutation({
    mutationFn: async (formData: ProposalOptionCreateRequest) => {
      const { data } = await axios.post("/api/proposal-option", formData);
      return data;
    },
    onError: onMutationError,
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Option has been created!",
      });

      form.reset();
      router.refresh();
    },
  });

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((e) => createOption(e))}
            id="proposal-option-form"
          >
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="category description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-6">
                  <FormLabel>Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find(
                                (category) => category === field.value
                              )
                            : "Select category"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search categories..." />
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={category}
                              key={category}
                              onSelect={() => {
                                form.setValue("category", category);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href="/admin/proposal-option"
          className={buttonVariants({ variant: "outline" })}
        >
          Cancel
        </Link>
        <Button form="proposal-option-form" isLoading={isLoading}>
          Create
        </Button>
      </CardFooter>
    </>
  );
};

export default ProposalOptionForm;
