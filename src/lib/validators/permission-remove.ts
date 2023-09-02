import z from "zod";

export const PermissionRemoveValidator = z.object({
  id: z.number(),
});

export type PermissionRemoveRequest = z.infer<typeof PermissionRemoveValidator>;
