import z from "zod";

export const UserValidator = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long." })
    .max(30, { message: "Password must have less than 30 characters." }),
  email: z.string().email("Please enter a valid email address"),
  company: z.string(),
});

export type UserUpdateRequest = z.infer<typeof UserValidator>;
