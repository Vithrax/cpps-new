import z from "zod";

export const CaseCreateValidator = z.object({
  order_id: z.string().min(5),
  comment: z.string().min(5),
});

export type CaseCreateRequest = z.infer<typeof CaseCreateValidator>;
