import z from "zod";

export const RemovePermissionsValidator = z.object({
  id: z.number(),
});

export type RemovePermissionsRequest = z.infer<
  typeof RemovePermissionsValidator
>;
