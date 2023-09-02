"use client";

import axios from "axios";
import type { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ArrowLeftRight } from "lucide-react";
import { Separator } from "./ui/separator";
import { CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { onMutationError } from "@/utils/mutation-error";
import { PermissionAddRequest } from "@/lib/validators/permission-add";
import { PermissionRemoveRequest } from "@/lib/validators/permission-remove";
import type { UserAccess } from "@prisma/client";

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
    mutationFn: async ({ companyId, userId }: PermissionAddRequest) => {
      const payload: PermissionAddRequest = {
        companyId,
        userId,
      };

      const { data } = await axios.post("/api/user/permission", payload);
      return data;
    },
    onError: onMutationError,
    onSuccess: () => {
      toast({
        description: "Permission has been added!",
      });

      router.refresh();
    },
  });

  const { mutate: removePermissions } = useMutation({
    mutationFn: async ({ id }: PermissionRemoveRequest) => {
      const payload: PermissionRemoveRequest = { id };

      const { data } = await axios.patch("/api/user/permission", payload);
      return data;
    },
    onError: onMutationError,
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
