import { z } from 'zod';

export const StoresQuerySchema = z.object({
  q: z.string().optional(),
  employerId: z.string().cuid().optional(),
  storeId: z.string().cuid().optional(),
  sortBy: z.enum(['address', 'checkoutNumber']).default('address'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  page: z.coerce.number().int().gte(1).default(1),
  pageSize: z.coerce.number().int().gte(1).lte(100).optional(),
});

export const GetStoresSchema = z.object({
  query: StoresQuerySchema,
});
