"use client";

import { FC } from "react";
import { CardContent } from "../ui/card";
import UploadZone from "../upload-dropzone";
import { toast } from "@/hooks/use-toast";
import { UploadFileResponse } from "uploadthing/client";
import { useMutation } from "@tanstack/react-query";
import { CaseUploadRequest } from "@/lib/validators/case-upload-attachment";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface CaseUploadFileProps {
  caseId: number;
}

const CaseUploadFile: FC<CaseUploadFileProps> = ({ caseId }) => {
  const router = useRouter();
  const { mutate: uploadAttachment } = useMutation({
    mutationFn: async ({ case_id, file_key, file_url }: CaseUploadRequest) => {
      const payload: CaseUploadRequest = {
        case_id,
        file_key,
        file_url,
      };

      const { data } = await axios.post(`/api/case/attachment/`, payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast({
          title: "There was an error.",
          description: "Attachment upload failed, try again later.",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        description: "Attachment has been uploaded!",
      });

      router.refresh();
    },
  });

  const uploadSuccessful = (res: UploadFileResponse[] | undefined) => {
    if (res) {
      // since upload files limit is set to 1, we will always refer to 0 index
      const file = res[0];

      uploadAttachment({
        case_id: caseId,
        file_key: file.key,
        file_url: file.url,
      });
    }
  };

  return (
    <>
      <CardContent>
        <UploadZone
          onUploadError={(error) => {
            toast({
              title: "Upload failed",
              description: error.message,
              variant: "destructive",
            });
          }}
          onClientUploadComplete={uploadSuccessful}
        />
      </CardContent>
    </>
  );
};

export default CaseUploadFile;
