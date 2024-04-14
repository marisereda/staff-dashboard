import { buhParser } from './parsers/buh-parser';
import { fopParser } from './parsers/fop-parser';
import { hrParser } from './parsers/hr-parser';
import { BuhReport, HrReport } from './types';
import { FopReport } from './types/fop-report.types';

class DataParserService {
  parseHrReport = (file: Buffer): HrReport => {
    return hrParser.parseReport(file);
  };

  parseBuhReport = (file: Buffer): BuhReport => {
    return buhParser.parseReport(file);
  };

  parseFopReport = (file: Buffer): FopReport[] => {
    return fopParser.parseReport(file);
  };
}

export const dataParserService = new DataParserService();
