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
  storeAddreessBuh: string;
  storeId: string;
  newStoreId: string;
  employerId: string;
  markDelete: boolean;

  createdAt: Date;
  updatedAt: Date;

  employer?: Employer;
  store?: Store;
};

export type Employer = {
  id: string;
  inn: string;
  name: string;
  markDelete: boolean;

  createdAt: Date;
  updatedAt: Date;
};

export type Store = {
  id: string;
  code1C: string;
  address: string;
  checkoutNumber: number;
  markDelete: boolean;

  createdAt: Date;
  updatedAt: Date;
};
