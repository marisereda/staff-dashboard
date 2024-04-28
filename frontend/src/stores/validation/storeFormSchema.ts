import z from 'zod';

export type Inputs = z.infer<typeof inputSchema>;

export const inputSchema = z.object({
  address: z.string(),

  checkoutNumber: z.coerce
    .number()
    .int()
    .gte(1, { message: 'В магазині не може бути менше однієї каси' })
    .lte(15, { message: 'В магазині не може бути більше 15 кас' }),

  placesAmount: z.coerce.number().int(),
});
