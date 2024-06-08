import { z } from 'zod';

export const GetEmployersSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    storeId: z.string().optional(),
    sortBy: z.enum(['inn', 'name']).default('name').optional(),
    sortOrder: z.enum(['asc', 'desc']).default('asc').optional(),
    page: z.coerce.number().int().gte(1).default(1).optional(),
    pageSize: z.coerce.number().int().gte(1).lte(100).optional(),
  }),
});

export const EmployerByIdSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export const CreateEmployerSchema = z.object({
  body: z.object({
    inn: z.string().min(8).max(10).regex(/^\d+$/),
    isSingleTax: z.boolean().default(false),
    name: z.string(),
  }),
});

export const UpdateEmployerSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
  body: z.object({
    inn: z.string().min(8).max(10).regex(/^\d+$/).optional(),
    isSingleTax: z.boolean().optional(),
    name: z.string().optional(),
  }),
});
