import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { capitalize } from "./string";

export const onMutationError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const description = error.request.responseText || "";
    if (error.response?.status == 401) {
      return toast({
        title: "Unauthorized",
        description,
        variant: "destructive",
      });
    }

    if (error.response?.status == 404) {
      return toast({
        title: `Not found`,
        description,
        variant: "destructive",
      });
    }

    if (error.response?.status == 409) {
      return toast({
        title: "Duplication",
        description,
        variant: "destructive",
      });
    }

    if (error.response?.status == 422) {
      return toast({
        title: "Incorrect status",
        description,
        variant: "destructive",
      });
    }
  }

  return toast({
    title: "Something went wrong",
    description: "Please try again later!",
    variant: "destructive",
  });
};
