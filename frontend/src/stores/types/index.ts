import { Employer } from '../../employers/types';

export type Store = {
  id: string;
  code1C: string;
  address: string;
  checkoutNumber: number;
  markDelete: boolean;

  createdAt: Date;
  updatedAt: Date;

  employers?: Employer[];
};

export type StoresSortBy = 'address' | 'checkoutNumber';
