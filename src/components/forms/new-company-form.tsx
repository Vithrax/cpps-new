"use client";

import axios from "axios";
import type { FC } from "react";
import { Brand } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import {
  CompanyCreateValidator,
  CreateCompanyRequest,
} from "@/lib/validators/company-new";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { onMutationError } from "@/utils/mutation-error";

interface NewCompanyFormProps {}

const NewCompanyForm: FC<NewCompanyFormProps> = () => {
  const brands = Object.keys(Brand) as Brand[];
  const router = useRouter();

  const form = useForm<CreateCompanyRequest>({
    resolver: zodResolver(CompanyCreateValidator),
  });

  const { mutate: createCompany, isLoading } = useMutation({
    mutationFn: async ({ id, brand, country, name }: CreateCompanyRequest) => {
      const payload: CreateCompanyRequest = { id, brand, country, name };

      const { data } = await axios.post("/api/company", payload);
      return data;
    },
    onError: onMutationError,
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
