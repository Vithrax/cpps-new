import z from "zod";

export const InitialsUpdateValidator = z.object({
  initials: z
    .string()
    .length(4, { message: "Initials must have exactly 4 characters." }),
});

export type InitialsUpdateRequest = z.infer<typeof InitialsUpdateValidator>;
