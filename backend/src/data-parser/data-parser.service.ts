import { buhParser } from './buh-parser';
import { hrParser } from './hr-parser';
import { BuhReport } from './type/buh-report.type';
import { HrReport } from './type/hr-report.type';

class DataParserService {
  parseHrReport = (file: Buffer): HrReport => {
    return hrParser.parseReport(file);
  };

  parseBuhReport = (file: Buffer): BuhReport => {
    return buhParser.parseReport(file);
  };
}

export const dataParserService = new DataParserService();
