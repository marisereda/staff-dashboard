import { z } from 'zod';
import { SortOrder } from '../../common/types';
import { updateStoreSchema } from '../validation';

export type Store = {
  id: string;
  code1C?: string;
  addressHr?: string;
  addressBuh?: string;
  checkoutNumber: number;
  placesAmount: number;
  updateStatus?: string;

  createdAt: Date;
  updatedAt: Date;
};

export type StoresSearchParams = {
  q: string;
  employerId: string;
  sortBy: 'code1C' | 'addressHr' | 'addressBuh' | 'checkoutNumber' | 'placesAmount';
  sortOrder: SortOrder;
  page: number;
  pageSize?: number;
};

export type UpdateStoreData = z.infer<typeof updateStoreSchema>;
