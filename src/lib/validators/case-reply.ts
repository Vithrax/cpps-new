import z from "zod";

export const CaseReplyValidator = z.object({
  replyText: z.string().min(5),
  case_id: z.number(),
});

export type CaseReplyRequest = z.infer<typeof CaseReplyValidator>;
