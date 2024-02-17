import { Store } from '@prisma/client';
import { z } from 'zod';
import { GetStoresSchema, StoresQuerySchema } from '../validation';

export type CreateStoreData = Pick<Store, 'code1C' | 'address'>;

export type StoresQuery = z.infer<typeof StoresQuerySchema>;
export type GetStores = z.infer<typeof GetStoresSchema>;
