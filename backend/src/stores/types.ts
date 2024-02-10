import { Store } from '@prisma/client';

export type CreateStoreData = Pick<Store, 'code1C' | 'address'>;
