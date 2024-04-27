import { z } from 'zod';

export const GetEmployeesSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    isFop: z
      .enum(['true', 'false'])
      .transform(str => str === 'true')
      .optional(),
    employerId: z.string().cuid().optional(),
    storeId: z.string().cuid().optional(),
    sortBy: z.enum(['name', 'isFop', 'inn', 'phone']).default('name'),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
    page: z.coerce.number().int().gte(1).default(1),
    pageSize: z.coerce.number().int().gte(1).lte(100).default(50),
  }),
});

export const GetEmployeeByIdSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export const UpdateEmployeeSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
  body: z.object({
    code1C: z.string().optional(),
    inn: z.string().optional(),
    name: z.string().optional(),
    isFop: z.boolean().optional(),
    phone: z.string().optional(),
    position: z.string().optional(),
    storeId: z.string().optional(),
    employerId: z.string().optional(),
  }),
});
