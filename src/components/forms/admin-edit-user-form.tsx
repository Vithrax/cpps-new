"use client";

import { Role, User } from "@prisma/client";
import { FC } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
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
import {
  AdminAccountUpdateRequest,
  AdminAccountValidator,
} from "@/lib/validators/admin-account";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { onMutationError } from "@/utils/mutation-error";

interface AdminEditUserFormProps {
  user: User;
  companies: number[];
}

const AdminEditUserForm: FC<AdminEditUserFormProps> = ({ user, companies }) => {
  const roles = Object.keys(Role) as Role[];
  const router = useRouter();

  const form = useForm<AdminAccountUpdateRequest>({
    resolver: zodResolver(AdminAccountValidator),
    defaultValues: {
      initials: user.initials!,
      role: user.permission_level,
      company: user.companyId as number | undefined,
    },
  });

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: async ({
      initials,
      role,
      company,
    }: AdminAccountUpdateRequest) => {
      const payload: AdminAccountUpdateRequest = {
        initials,
        role,
        company,
      };

      const { data } = await axios.patch(`/api/user/${user.id}`, payload);
      return data;
    },
    onError: onMutationError,
    onSuccess: () => {
      toast({
        description: "User account has been updated!",
      });

      router.refresh();
    },
  });

  return (
    <>
      <Separator className="mb-3" />
      <CardContent>
        <Form {...form}>
          <form
            id="admin-update-user-form"
            onSubmit={form.handleSubmit((e) => updateUser(e))}
          >
            <FormField
              name="initials"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initials</FormLabel>
                  <FormControl>
                    <Input placeholder="user initials..." {...field} />
                  </FormControl>
                  <FormDescription>
                    User friendly name (initials)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-6">
                  <FormLabel>Role</FormLabel>
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
                            ? roles.find((role) => role === field.value)
                            : "Select role"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search roles..." />
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          {roles.map((role) => (
                            <CommandItem
                              value={role}
                              key={role}
                              onSelect={() => {
                                form.setValue("role", role);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  role === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {role}
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
              control={form.control}
              name="company"
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
                            ? companies.find(
                                (company) => company === field.value
                              )
                            : "Select company"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search companies..." />
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          {companies.map((company) => (
                            <CommandItem
                              value={company.toString()}
                              key={company}
                              onSelect={() => {
                                form.setValue("company", company);
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
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={router.back}>
          Cancel
        </Button>
        <Button isLoading={isLoading} form="admin-update-user-form">
          Update
        </Button>
      </CardFooter>
    </>
  );
};

export default AdminEditUserForm;
