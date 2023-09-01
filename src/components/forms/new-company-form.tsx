"use client";

import { FC } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  CreateCompanyValidator,
  CompanyCreateRequest,
} from "@/lib/validators/new-company";
import { CardContent, CardFooter } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Brand } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { redirect, useRouter } from "next/navigation";

interface NewCompanyFormProps {}

const NewCompanyForm: FC<NewCompanyFormProps> = () => {
  const brands = Object.keys(Brand) as Brand[];
  const router = useRouter();

  const form = useForm<CompanyCreateRequest>({
    resolver: zodResolver(CreateCompanyValidator),
  });

  const { mutate: createCompany, isLoading } = useMutation({
    mutationFn: async ({ id, brand, country, name }: CompanyCreateRequest) => {
      const idNumber = +id;
      const payload: CompanyCreateRequest = { id, brand, country, name };

      const { data } = await axios.post("/api/company", payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast({
            title: "Company already exists.",
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
        description: "Company created successfully",
      });

      router.push("/admin/company");
    },
  });

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            id="new-company-form"
            onSubmit={form.handleSubmit((e) => createCompany(e))}
          >
            <FormField
              name="id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="id..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Company identification number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name..." {...field} />
                  </FormControl>
                  <FormDescription>Officialy registered name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="country..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Company registration country
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-6">
                  <FormLabel>Brand</FormLabel>
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
                            ? brands.find((brand) => brand === field.value)
                            : "Select brand"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search brands..." />
                        <CommandEmpty>No brand found.</CommandEmpty>
                        <CommandGroup>
                          {brands.map((brand) => (
                            <CommandItem
                              value={brand}
                              key={brand}
                              onSelect={() => {
                                form.setValue("brand", brand);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  brand === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {brand}
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
        <Button variant="outline">Cancel</Button>
        <Button form="new-company-form" isLoading={isLoading}>
          Create
        </Button>
      </CardFooter>
    </>
  );
};

export default NewCompanyForm;
