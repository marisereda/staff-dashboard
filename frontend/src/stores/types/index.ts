import { Employer } from '../../employers/types';

export type Store = {
  id: string;
  code1C: string;
  address: string;
  checkoutNumber: number;
  placesAmount: number;
  updateStatus: string;

  createdAt: Date;
  updatedAt: Date;

  employers?: Employer[];
};

export type StoresSortBy = 'address' | 'checkoutNumber';
