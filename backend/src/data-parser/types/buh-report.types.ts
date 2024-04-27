export type BuhReportEmployer = {
  name: string;
};

export type BuhReportStore = {
  address: string;
};

export type BuhReportEmployee = {
  inn: string;
  name: string;
  position: string;
  employer: BuhReportEmployer;
  store: BuhReportStore;
};
