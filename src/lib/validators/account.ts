import z from "zod";

export const AccountValidator = z.object({
  initials: z
    .string()
    .length(4, { message: "Initials must have exactly 4 characters." }),
});

export type AccountUpdateValidator = z.infer<typeof AccountValidator>;
