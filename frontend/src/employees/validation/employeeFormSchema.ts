import z from 'zod';

export type Inputs = z.infer<typeof inputSchema>;

export const inputSchema = z.object({
  inn: z.string().optional(),
  name: z.string().min(1, { message: 'Довжина ПІБ має бути не менше 1 символа' }),
  isFop: z.boolean().default(false),
});
