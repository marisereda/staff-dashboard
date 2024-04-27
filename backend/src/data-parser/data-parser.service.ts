import { buhParser } from './parsers/buh-parser';
import { fopParser } from './parsers/fop-parser';
import { hrParser } from './parsers/hr-parser';
import { BuhReportEmployee, HrReportEmployee } from './types';
import { FopReportEmployee } from './types/fop-report.types';

class DataParserService {
  parseHrReport = (file: Buffer): HrReportEmployee[] => {
    return hrParser.parseReport(file);
  };

  parseBuhReport = (file: Buffer): BuhReportEmployee[] => {
    return buhParser.parseReport(file);
  };

  parseFopReport = (file: Buffer): FopReportEmployee[] => {
    return fopParser.parseReport(file);
  };
}

export const dataParserService = new DataParserService();
