export type HrReportStore = {
  code1C: string;
  addressHr: string;
};

export type HrReportEmployee = {
  code1C: string;
  inn: string;
  name: string;
  phone: string;
  position: string;
  store: HrReportStore;
};
