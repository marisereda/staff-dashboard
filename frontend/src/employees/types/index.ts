export type EmployeeResponse = {
  id: string;
  code1C: string;
  inn: string;
  name: string;
  isFop: boolean;
  phone: string;
  updateStatus: string;

  createdAt: Date;
  updatedAt: Date;
  employeeEmployers: EmployeeEmployer[];
  employeeStores: EmployeeStore[];
};

export type EmployeeEmployer = {
  id: string;
  employeeId: string;
  employerId: string;
  positionBuh: string;
  storeAddressBuh: string;
  employer: Employer;

  createdAt: Date;
  updatedAt: Date;
};

export type EmployeeStore = {
  id: string;
  employeeId: string;
  storeId: string;
  positionHr: string;
  store: Store;
  createdAt: Date;
  updatedAt: Date;
};

export type Employer = {
  id: string;
  inn: string;
  name: string;
  isSingleTax: boolean;
  updateStatus: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Store = {
  id: string;
  code1C: string;
  address: string;
  checkoutNumber: number | null;
  placesAmount: number | null;
  updateStatus: string;
  createdAt: Date;
  updatedAt: Date;
};

export type EmployeesSortBy =
  | 'name'
  | 'isFop'
  | 'position'
  | 'inn'
  | 'phone'
  | 'employerName'
  | 'storeAddress';
