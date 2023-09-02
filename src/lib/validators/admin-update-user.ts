import { Role } from "@prisma/client";
import z from "zod";

const roles = [
  "admin",
  "client",
  "customer_service",
  "operator",
  "trainer",
] as const;

export const AdminUpdateUserValidator = z.object({
  initials: z
    .string()
    .length(4, { message: "Initials must have exactly 4 characters." }),
  role: z.enum<Role, typeof roles>(roles),
  company: z.number(),
});

export type AdminUpdateUserRequest = z.infer<typeof AdminUpdateUserValidator>;
