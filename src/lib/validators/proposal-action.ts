import z from "zod";

export const ProposalActionValidator = z.object({
  action: z.enum(["accepted", "rejected", "cancelled"]),
});

export type ProposalActionRequest = z.infer<typeof ProposalActionValidator>;
