import z from "zod";

export const CreateProposalValidator = z.object({
  orderId: z.string(),
  left_options: z.array(z.number()),
  right_options: z.array(z.number()),
});

export const CreateProposalForm = z.object({
  orderId: z.string(),
});

export type CreateProposalFormRequest = z.infer<typeof CreateProposalForm>;

export type CreateProposalRequest = z.infer<typeof CreateProposalValidator>;
