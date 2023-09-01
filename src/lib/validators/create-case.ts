import z from "zod";

export const CreateCaseValidator = z.object({
  order_id: z.string().min(5),
  comment: z.string().min(5),
});

export type CreateCaseRequest = z.infer<typeof CreateCaseValidator>;
