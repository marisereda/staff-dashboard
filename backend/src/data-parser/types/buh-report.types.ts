export type BuhReportEmployer = {
  name: string;
};

export type BuhReportStore = {
  code1C: string;
  addressBuh: string;
};

export type BuhReportEmployee = {
  inn: string;
  name: string;
  position: string;
  employer: BuhReportEmployer;
  store: BuhReportStore;
};
