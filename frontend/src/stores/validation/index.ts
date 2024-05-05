import z from 'zod';

export const updateStoreSchema = z.object({
  addressHr: z.string(),
  addressBuh: z.string(),
  checkoutNumber: z.coerce
    .number()
    .int()
    .gte(1, { message: 'В магазині не може бути менше однієї каси' })
    .lte(15, { message: 'В магазині не може бути більше 15 кас' }),
  placesAmount: z.coerce.number().int(),
});
