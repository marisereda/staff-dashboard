import { Employer } from '../../employers/types';
import { Store } from '../../stores/types';

export type Employee = {
  id: string;
  code1C: string;
  inn: string;
  name: string;
  isFop: boolean;
  phone: string;
  position: string;
  newPosition: string;
  positionBuh: string;
  storeAddressBuh: string;
  storeId: string;
  newStoreId: string;
  employerId: string;
  markDelete: boolean;

  createdAt: Date;
  updatedAt: Date;

  employer?: Employer;
  store?: Store;
};

export type EmployeesSortBy =
  | 'name'
  | 'isFop'
  | 'position'
  | 'inn'
  | 'phone'
  | 'employerName'
  | 'storeAddress';
