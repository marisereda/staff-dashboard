import { z } from 'zod';
import { GetStoresSchema, UpdateStoreSchema } from '../validation';

export type GetStoresRequest = z.infer<typeof GetStoresSchema>;
export type UpdateStoreRequest = z.infer<typeof UpdateStoreSchema>;

export type GetStoresQuery = GetStoresRequest['query'];
export type UpdateStoreData = UpdateStoreRequest['body'];
