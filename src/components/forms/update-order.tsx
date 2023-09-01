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
  OrderUpdateValdiator,
  OrderUpdateRequest,
} from "@/lib/validators/update-order";
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
import { Order } from "@prisma/client";

interface UpdateOrderFormProps {
  companies: number[];
  order: Order;
}

const UpdateOrderForm: FC<UpdateOrderFormProps> = ({ companies, order }) => {
  const router = useRouter();
  const form = useForm<OrderUpdateRequest>({
    resolver: zodResolver(OrderUpdateValdiator),
    defaultValues: {
      companyId: order.companyId,
      enduser_name: order.enduser_name || "",
      external_id: order.external_id || "",
      first_product_id: order.first_product_id,
      second_product_id: order.second_product_id || "",
    },
  });

  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: async ({
      companyId,
      enduser_name,
      external_id,
      first_product_id,
      second_product_id,
    }: OrderUpdateRequest) => {
      const payload: OrderUpdateRequest = {
        companyId,
        enduser_name,
        external_id,
        first_product_id,
        second_product_id,
      };

      const { data } = await axios.patch(
        `/api/order/${order.order_id}`,
        payload
      );
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return toast({
            title: "Order not found.",
            description: "Please verify order id.",
            variant: "destructive",
          });
        }

        return toast({
          title: "There was an error.",
          description: "Order update failed, try again later.",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        description: "Order updated successfully",
      });

      router.refresh();
    },
  });

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            id="update-order-form"
            onSubmit={form.handleSubmit((e) => createOrder(e))}
          >
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
          Reset
        </Button>
        <Button isLoading={isLoading} form="update-order-form">
          Update
        </Button>
      </CardFooter>
    </>
  );
};

export default UpdateOrderForm;
