import z from "zod";
import type { Brand } from "@prisma/client";

const options = ["bernafon", "multibrand", "oticon", "sonic"] as const;

export const CompanyUpdateValidator = z.object({
  name: z
    .string()
    .min(5, { message: "Name must have at least 5 characters" })
    .max(100, { message: "Name must have less than 100 characters" }),
  country: z
    .string()
    .min(4, { message: "Name must have at least 5 characters" })
    .max(56, { message: "Name must have less than 100 characters" }),
  brand: z.enum<Brand, typeof options>(options),
});

export type CompanyUpdateRequest = z.infer<typeof CompanyUpdateValidator>;
