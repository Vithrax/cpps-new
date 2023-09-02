import z from "zod";

export const ProposalCreateValidator = z.object({
  orderId: z.string(),
  left_options: z.array(z.number()),
  right_options: z.array(z.number()),
});

export const ProposalCreateFormValidator = z.object({
  orderId: z.string(),
});

export type ProposalCreateFormRequest = z.infer<
  typeof ProposalCreateFormValidator
>;

export type ProposalCreateRequest = z.infer<typeof ProposalCreateValidator>;
