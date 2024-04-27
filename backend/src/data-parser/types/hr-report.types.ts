export type HrReportStore = {
  code1C: string;
  address: string;
};

export type HrReportEmployee = {
  code1C: string;
  inn: string;
  name: string;
  phone: string;
  position: string;
  store: HrReportStore;
};
