import { z } from 'zod';

export const EmployeesQuerySchema = z.object({
  q: z.string().optional(),
  isFop: z
    .enum(['true', 'false'])
    .transform(str => str === 'true')
    .optional(),
  employerId: z.string().cuid().optional(),
  storeId: z.string().cuid().optional(),
  sortBy: z.enum(['name', 'isFop', 'position']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  page: z.coerce.number().int().gte(1).default(1),
  pageSize: z.coerce.number().int().gte(1).lte(100).default(50),
});

const EmployeeParamsSchema = z.object({
  id: z.string().cuid(),
});

export const GetEmployeesSchema = z.object({
  query: EmployeesQuerySchema,
});

export const GetEmployeeByIdSchema = z.object({
  params: EmployeeParamsSchema,
});
