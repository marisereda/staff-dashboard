import { z } from 'zod';
import { GetStoresSchema, StoreByIdSchema, UpdateStoreSchema } from '../validation';

export type GetStoresRequest = z.infer<typeof GetStoresSchema>;
export type GetStoreRequest = z.infer<typeof StoreByIdSchema>;
export type UpdateStoreRequest = z.infer<typeof UpdateStoreSchema>;

export type GetStoresQuery = GetStoresRequest['query'];
