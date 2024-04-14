import { dataParserService } from '~/data-parser/data-parser.service';
import { FopReport } from '~/data-parser/types/fop-report.types';

class UpdateFopService {
  updateFromReport = async (file: Buffer): Promise<FopReport[]> => {
    const parseFopReportResult = dataParserService.parseFopReport(file);
    console.log(parseFopReportResult);
    return parseFopReportResult;
  };
}

export const updateFopService = new UpdateFopService();
