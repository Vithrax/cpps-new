"use client";

import type { FC } from "react";
import { Separator } from "./ui/separator";
import { CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "./ui/button";
import { UserAccess } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { AddPermissionsRequest } from "@/lib/validators/add-permissions";
import { RemovePermissionsRequest } from "@/lib/validators/remove-permissions";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface AccessManagerProps {
  companies: number[];
  userAccess: Pick<UserAccess, "companyId" | "id">[];
  userId: string;
}

const AccessManager: FC<AccessManagerProps> = ({
  companies,
  userAccess,
  userId,
}) => {
  const router = useRouter();
  const userCompanies = userAccess.map(({ companyId }) => companyId);
  const filteredCompanies = companies.filter(
    (company) => !userCompanies.includes(company)
  );

  const { mutate: addPermissions } = useMutation({
    mutationFn: async ({ companyId, userId }: AddPermissionsRequest) => {
      const payload: AddPermissionsRequest = {
        companyId,
        userId,
      };

      const { data } = await axios.post("/api/user/permission", payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast({
            title: "Permission already exists.",
            variant: "destructive",
          });
        }

        return toast({
          title: "There was an error.",
          description: "Permission update failed, try again later.",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        description: "Permission has been added!",
      });

      router.refresh();
    },
  });

  const { mutate: removePermissions } = useMutation({
    mutationFn: async ({ id }: RemovePermissionsRequest) => {
      const payload: RemovePermissionsRequest = { id };

      const { data } = await axios.patch("/api/user/permission", payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return toast({
            title: "Permission does not exist.",
            variant: "destructive",
          });
        }

        return toast({
          title: "There was an error.",
          description: "Permission update failed, try again later.",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        description: "Permission has been removed!",
      });

      router.refresh();
    },
  });

  return (
    <>
      <Separator />
      <CardContent className="flex justify-between items-center">
        <ScrollArea className="h-72 w-fit mt-6 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              Has access
            </h4>
            {userAccess.length === 0 ? (
              <div className="text-muted-foreground text-sm">Nothing.</div>
            ) : (
              userAccess.map(({ companyId, id }) => (
                <>
                  <Button
                    variant="ghost"
                    size="xs"
                    key={companyId}
                    className="text-sm"
                    onClick={() => removePermissions({ id })}
                  >
                    {companyId}
                  </Button>
                  <Separator className="my-0.5" />
                </>
              ))
            )}
          </div>
        </ScrollArea>
        <ArrowLeftRight />
        <ScrollArea className="h-72 w-fit mt-6 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">No access</h4>
            {filteredCompanies.length === 0 ? (
              <div className="text-muted-foreground text-sm">Nothing.</div>
            ) : (
              filteredCompanies.map((companyId) => (
                <>
                  <Button
                    variant="ghost"
                    size="xs"
                    key={companyId}
                    className="text-sm"
                    onClick={() => addPermissions({ userId, companyId })}
                  >
                    {companyId}
                  </Button>
                  <Separator className="my-0.5" />
                </>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </>
  );
};

export default AccessManager;
