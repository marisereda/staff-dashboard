import z from 'zod';

export type Inputs = z.infer<typeof inputSchema>;

export const inputSchema = z.object({
  inn: z
    .string()
    .regex(/^\d+$/, 'ІПН має містити лише цифри')
    .min(8, { message: 'Довжина ІПН має бути не менше 8 цифр' })
    .max(10, { message: 'Довжина ІПН має бути не більше 10 цифр' }),
  name: z.string().min(1, { message: 'Довжина ПІБ має бути не менше 1 символа' }),
});
