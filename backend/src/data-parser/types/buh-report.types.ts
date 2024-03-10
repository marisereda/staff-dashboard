export type BuhReportEmployer = { name: string };

export type BuhReportStore = { storeAddressBuh: string };

export type BuhReportEmployee = { inn: string; name: string; positionBuh: string };

export type BuhReport = {
  employer: BuhReportEmployer;
  employee: BuhReportEmployee & BuhReportStore;
}[];
