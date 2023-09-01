"use client";

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
import {
  OrderCreateValdiator,
  OrderCreateRequest,
} from "@/lib/validators/new-order";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { toast } from "@/hooks/use-toast";

interface CreateOrderFormProps {
  companies: number[];
}

const CreateOrderForm: FC<CreateOrderFormProps> = ({ companies }) => {
  const router = useRouter();
  const form = useForm<OrderCreateRequest>({
    resolver: zodResolver(OrderCreateValdiator),
  });

  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: async ({
      companyId,
      order_id,
      enduser_name,
      external_id,
      first_product_id,
      second_product_id,
    }: OrderCreateRequest) => {
      const payload: OrderCreateRequest = {
        companyId,
        order_id,
        enduser_name,
        external_id,
        first_product_id,
        second_product_id,
      };

      const { data } = await axios.post("/api/order/", payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast({
            title: "Order already exists.",
            description: "Please choose a different order id.",
            variant: "destructive",
          });
        }

        return toast({
          title: "There was an error.",
          description: "Order creation failed, try again later.",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        description: "Order created successfully",
      });

      router.refresh();
      router.back();
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
                <FormItem>
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input placeholder="order id..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Unique order identification number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="external_id"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>External ID (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="external id..." {...field} />
                  </FormControl>
                  <FormDescription>
                    External id number provided by the company
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-6">
                  <FormLabel>Company</FormLabel>
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
                            ? companies.find((brand) => brand === +field.value)
                            : "Select Company"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search companies..." />
                        <CommandEmpty>No brand found.</CommandEmpty>
                        <CommandGroup>
                          {companies.map((company) => (
                            <CommandItem
                              value={company.toString()}
                              key={company}
                              onSelect={() => {
                                form.setValue("companyId", company);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  company === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {company}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              name="enduser_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>End user name (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="end user..." {...field} />
                  </FormControl>
                  <FormDescription>Name of end user</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="first_product_id"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>First device ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="first device serial number..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="second_product_id"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Second device ID (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="second device serial number..."
                      {...field}
                    />
                  </FormControl>
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

export default CreateOrderForm;
