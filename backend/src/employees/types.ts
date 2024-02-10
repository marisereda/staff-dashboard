import { Employee, Store } from '@prisma/client';

export type CreateEmployeeData = Pick<Employee, 'code1C' | 'inn' | 'name' | 'position'> & {
  store: {
    code1C: Store['code1C'];
  };
};
