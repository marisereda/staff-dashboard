import { z } from 'zod';
import { SortOrder } from '../../common/types';
import { createEmployerSchema } from '../validation';

export type Employer = {
  id: string;
  inn: string;
  isSingleTax: boolean;
  name: string;
  updateStatus?: string;

  createdAt: Date;
  updatedAt: Date;
};

export type EmployersSearchParams = {
  q: string;
  storeId?: string;
  sortBy: 'inn' | 'name';
  sortOrder: SortOrder;
  page: number;
  pageSize?: number;
};

export type CreateEmployerData = z.infer<typeof createEmployerSchema>;
