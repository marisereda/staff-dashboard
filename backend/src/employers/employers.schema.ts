import { z } from 'zod';

const EmployersQuerySchema = z.object({
  q: z.string().optional(),
  storeId: z.string().cuid().optional(),
  sortBy: z.enum(['inn', 'name']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  page: z.coerce.number().int().gte(1).default(1),
  pageSize: z.coerce.number().int().gte(1).lte(100).default(50),
});

const EmployerParamsSchema = z.object({
  id: z.string().cuid(),
});

const CreateEmployerBodySchema = z.object({
  inn: z.string().min(8).max(10).regex(/^\d+$/).optional(),
  name: z.string(),
  stores: z.string().cuid().array(),
});

const UpdateEmployerBodySchema = CreateEmployerBodySchema.optional();

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

export type EmployersQuery = z.infer<typeof EmployersQuerySchema>;
export type CreateEmployerBody = z.infer<typeof CreateEmployerBodySchema>;
export type UpdateEmployerBodySchema = z.infer<typeof UpdateEmployerBodySchema>;

export type GetEmployers = z.infer<typeof GetEmployersSchema>;
export type EmployerById = z.infer<typeof EmployerByIdSchema>;
export type CreateEmployer = z.infer<typeof CreateEmployerSchema>;
export type UpdateEmployer = z.infer<typeof UpdateEmployerSchema>;
