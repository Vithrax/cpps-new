import z from "zod";

export const CaseUploadValidator = z.object({
  case_id: z.number(),
  file_url: z.string(),
  file_key: z.string(),
});

export type CaseUploadRequest = z.infer<typeof CaseUploadValidator>;
