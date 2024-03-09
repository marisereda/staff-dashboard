import { z } from 'zod';

export const EmployersQuerySchema = z.object({
  q: z.string().optional(),
  storeId: z.string().cuid().optional(),
  employerId: z.string().cuid().optional(),
  sortBy: z.enum(['inn', 'name']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  page: z.coerce.number().int().gte(1).default(1),
  pageSize: z.coerce.number().int().gte(1).lte(100).default(50),
});

const EmployerParamsSchema = z.object({
  id: z.string().cuid(),
});

export const CreateEmployerBodySchema = z.object({
  inn: z.string().min(8).max(10).regex(/^\d+$/),
  name: z.string(),
  stores: z.string().cuid().array(),
});

export const UpdateEmployerBodySchema = CreateEmployerBodySchema;

export const GetEmployersSchema = z.object({
  query: EmployersQuerySchema,
});

export const EmployerByIdSchema = z.object({
  params: EmployerParamsSchema,
});

export const CreateEmployerSchema = z.object({
  body: CreateEmployerBodySchema,
});

export const UpdateEmployerSchema = z.object({
  params: EmployerParamsSchema,
  body: UpdateEmployerBodySchema,
});
