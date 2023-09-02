import z from "zod";

export const ProposalOptionValidator = z.object({
  id: z.number(),
  state: z.boolean(),
});

export type ProposalOptionUpdateRequest = z.infer<
  typeof ProposalOptionValidator
>;
