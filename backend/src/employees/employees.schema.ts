import { z } from 'zod';

const EmployeesQuerySchema = z.object({
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

export type EmployeesQuery = z.infer<typeof EmployeesQuerySchema>;
export type EmployeeParams = z.infer<typeof GetEmployeesSchema>;

export type GetEmployees = z.infer<typeof GetEmployeesSchema>;
export type GetEmployeeById = z.infer<typeof GetEmployeeByIdSchema>;
