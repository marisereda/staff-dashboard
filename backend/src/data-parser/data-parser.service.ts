import * as buhParser from './buh-parser';
import * as hrParser from './hr-parser';
import { BuhReport } from './type/buh-report.type';
import { HrReport } from './type/hr-report.type';

export const parseHrReport = (fileName: string): HrReport => {
  return hrParser.parseReport(fileName);
};

export const parseBuhReport = (fileName: string): BuhReport => {
  return buhParser.parseReport(fileName);
};
