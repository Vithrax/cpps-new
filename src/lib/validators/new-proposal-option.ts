import z from "zod";
import type { OptionCategory } from "@prisma/client";

const options = ["additional", "feature", "reason", "size"] as const;

export const CreateProposalOptionValidator = z.object({
  description: z
    .string()
    .min(3, { message: "Description must have at least 3 characters" })
    .max(100, { message: "Description must have less than 100 characters" }),

  category: z.enum<OptionCategory, typeof options>(options),
});

export type ProposalOptionCreateRequest = z.infer<
  typeof CreateProposalOptionValidator
>;
