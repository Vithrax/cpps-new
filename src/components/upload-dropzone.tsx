import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Upload } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { FC } from "react";
import { UploadFileResponse } from "uploadthing/client";

interface UploadZoneProps {
  onUploadError?: (error: Error) => void;
  onClientUploadComplete?: (res: UploadFileResponse[] | undefined) => void;
  onUploadBegin?: (fileName: string) => void;
  onUploadProgress?: (progress: number) => void;
}

const UploadZone: FC<UploadZoneProps> = ({
  onUploadError,
  onClientUploadComplete,
  onUploadBegin,
  onUploadProgress,
}) => {
  return (
    <UploadDropzone<OurFileRouter>
      endpoint="imageUploader"
      onUploadError={onUploadError}
      onClientUploadComplete={onClientUploadComplete}
      onUploadBegin={onUploadBegin}
      onUploadProgress={onUploadProgress}
      config={{ mode: "manual" }}
      content={{
        uploadIcon: <Upload />,
      }}
      appearance={{
        button: buttonVariants(),
        label: "text-primary",
        uploadIcon: "h-8 w-8",
      }}
    />
  );
};

export default UploadZone;
