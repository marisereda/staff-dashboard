import z from 'zod';

export const updateEmployeeSchema = z.object({
  inn: z.string().min(8).max(10).regex(/^\d+$/),
  isFop: z.boolean(),
  name: z.string().min(3, { message: 'Довжина ПІБ має бути не менше 3 символа' }),
});
