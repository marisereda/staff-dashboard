import { Store } from '@prisma/client';

export type HrReportStore = Pick<Store, 'address' | 'code1C'>;

export type HrReportEmployee = {
  inn: string;
  name: string;
  position: string;
  code1C: string;
  phone: string;
};

export type HrReport = {
  store: HrReportStore;
  employee: HrReportEmployee;
}[];
