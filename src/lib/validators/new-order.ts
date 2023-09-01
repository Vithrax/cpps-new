import z from "zod";

export const OrderCreateValdiator = z.object({
  order_id: z.string(),
  companyId: z.number(),
  external_id: z.string().optional(),
  enduser_name: z.string().optional(),
  first_product_id: z.string().min(5),
  second_product_id: z.string().optional(),
});

export type OrderCreateRequest = z.infer<typeof OrderCreateValdiator>;