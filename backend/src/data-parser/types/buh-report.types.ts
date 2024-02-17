import { Employee, Employer } from '@prisma/client';

export type BuhReportEmployer = Pick<Employer, 'name'>;

export type BuhReportStore = Pick<Employee, 'storeAddreessBuh'>;

export type BuhReportEmployee = Pick<Employee, 'inn' | 'name' | 'position'>;

export type BuhReport = {
  employer: BuhReportEmployer;
  employee: BuhReportEmployee & BuhReportStore;
}[];
