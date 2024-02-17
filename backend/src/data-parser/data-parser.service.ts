import { buhParser } from './parsers/buh-parser';
import { hrParser } from './parsers/hr-parser';
import { BuhReport, HrReport } from './types';

class DataParserService {
  parseHrReport = (file: Buffer): HrReport => {
    return hrParser.parseReport(file);
  };

  parseBuhReport = (file: Buffer): BuhReport => {
    return buhParser.parseReport(file);
  };
}

export const dataParserService = new DataParserService();
