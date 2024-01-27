import { Employee, Store } from '@prisma/client';

export type HrReportStore = Pick<Store, 'address' | 'code1C'>;

export type HrReportEmployee = Pick<Employee, 'inn' | 'name' | 'position'>;

export type HrReport = {
  store: HrReportStore;
  employee: HrReportEmployee;
}[];
