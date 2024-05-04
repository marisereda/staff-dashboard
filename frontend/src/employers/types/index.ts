import { Store } from '../../stores/types';

export type EmployerResponse = {
  id: string;
  inn: string;
  name: string;
  isSingleTax: boolean;
  updateStatus: string;
  stores?: Store[];

  createdAt: Date;
  updatedAt: Date;
};

export type EmployersSortBy = 'inn' | 'name';
