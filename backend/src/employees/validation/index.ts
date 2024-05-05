import { z } from 'zod';

export const GetEmployeesSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    isFop: z
      .enum(['true', 'false'])
      .transform(str => str === 'true')
      .optional(),
    storeId: z.string().cuid().optional(),
    employerId: z.string().cuid().optional(),
    sortBy: z.enum(['code1C', 'inn', 'isFop', 'name', 'phone']).default('name'),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
    page: z.coerce.number().int().gte(1).default(1),
    pageSize: z.coerce.number().int().gte(1).lte(100).default(50),
  }),
});

export const EmployeeByIdSchema = z.object({
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
    inn: z.string().min(8).max(10).regex(/^\d+$/).optional(),
    isFop: z.boolean().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
  }),
});
