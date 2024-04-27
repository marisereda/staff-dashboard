import { z } from 'zod';

export const GetEmployersSchema = z.object({
  query: z.object({
    q: z.string().optional(),
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
    name: z.string(),
    isSingleTax: z.boolean().default(false),
    storeAddressesBuh: z.string().optional(),
  }),
});

export const UpdateEmployerSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
  body: z.object({
    inn: z.string().min(8).max(10).regex(/^\d+$/),
    name: z.string(),
    isSingleTax: z.boolean().default(false),
  }),
});
