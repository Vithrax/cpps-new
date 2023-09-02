"use client";

import axios from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Brand, type Company } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
  UpdateCompanyValidator,
  CompanyUpdateRequest,
} from "@/lib/validators/update-company";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { onMutationError } from "@/utils/mutation-error";

interface UpdateCompanyFormProps {
  company: Company;
}

const UpdateCompanyForm: FC<UpdateCompanyFormProps> = ({ company }) => {
  const brands = Object.keys(Brand) as Brand[];
  const router = useRouter();

  const form = useForm<CompanyUpdateRequest>({
    resolver: zodResolver(UpdateCompanyValidator),
    defaultValues: {
      brand: company.brand,
      country: company.country,
      name: company.name,
    },
  });

  const { mutate: createCompany, isLoading } = useMutation({
    mutationFn: async ({ brand, country, name }: CompanyUpdateRequest) => {
      const payload: CompanyUpdateRequest = { brand, country, name };

      const { data } = await axios.patch(`/api/company/${company.id}`, payload);
      return data;
    },
    onError: onMutationError,
    onSuccess: () => {
      toast({
        description: "Company created successfully",
      });

      router.refresh();
      router.push("/admin/company");
    },
  });

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            id="update-company-form"
            onSubmit={form.handleSubmit((e) => createCompany(e))}
          >
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
        <Button variant="outline" onClick={router.back}>
          Cancel
        </Button>
        <Button form="update-company-form" isLoading={isLoading}>
          Create
        </Button>
      </CardFooter>
    </>
  );
};

export default UpdateCompanyForm;
