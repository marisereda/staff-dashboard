import { z } from 'zod';

export const GetStoresSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    employerId: z.string().optional(),
    sortBy: z
      .enum(['code1C', 'addressHr', 'addressBuh', 'checkoutNumber', 'placesAmount'])
      .default('addressHr'),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
    page: z.coerce.number().int().gte(1).default(1),
    pageSize: z.coerce.number().int().gte(1).lte(100).optional(),
  }),
});

export const StoreByIdSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export const UpdateStoreSchema = z.object({
  params: z.object({ id: z.string().cuid() }),
  body: z.object({
    code1C: z.string().optional(),
    address: z.string().optional(),
    addressBuh: z.string().optional(),
    checkoutNumber: z.coerce.number().int().gte(0).optional(),
    placesAmount: z.coerce.number().int().gte(0).optional(),
  }),
});
