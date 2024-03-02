import { Store } from '../../stores/types';

export type Employer = {
  id: string;
  inn: string;
  name: string;
  markDelete: boolean;

  stores?: Store[];

  createdAt: Date;
  updatedAt: Date;
};

export type EmployersSortBy = 'inn' | 'name';
