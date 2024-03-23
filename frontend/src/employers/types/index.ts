import { Store } from '../../stores/types';

export type Employer = {
  id: string;
  inn: string;
  name: string;
  isSingleTax: boolean;
  markDelete: boolean;
  storeAddressesBuh: string;

  stores?: Store[];

  createdAt: Date;
  updatedAt: Date;
};

export type EmployersSortBy = 'inn' | 'name';
