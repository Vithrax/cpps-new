import z from "zod";

export const ProposalReplyValidator = z.object({
  action: z.enum(["accepted", "rejected", "cancelled"]),
});

export type ProposalReplyRequest = z.infer<typeof ProposalReplyValidator>;
