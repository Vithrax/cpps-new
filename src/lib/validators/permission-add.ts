import z from "zod";

export const PermissionAddValidator = z.object({
  userId: z.string(),
  companyId: z.number(),
});

export type PermissionAddRequest = z.infer<typeof PermissionAddValidator>;
