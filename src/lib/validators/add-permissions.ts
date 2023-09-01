import z from "zod";

export const AddPermissionsValidator = z.object({
  userId: z.string(),
  companyId: z.number(),
});

export type AddPermissionsRequest = z.infer<typeof AddPermissionsValidator>;
