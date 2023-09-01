import z from "zod";

export const ReplyValidator = z.object({
  replyText: z.string().min(5),
  case_id: z.number(),
});

export type ReplyRequest = z.infer<typeof ReplyValidator>;
