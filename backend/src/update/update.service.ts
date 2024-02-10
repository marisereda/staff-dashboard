import { Store } from '@prisma/client';
import { dataParserService } from '~/data-parser/data-parser.service';
import { HrReport, HrReportStore } from '~/data-parser/type/hr-report.type';
import { storesService } from '~/stores/stores.service';

class UpdateService {
  updateFromBuhReport = (file: Buffer, inn: string): void => {
    const report = dataParserService.parseBuhReport(file);
  };

  updateFromHrReport = async (file: Buffer): Promise<void> => {
    const report = dataParserService.parseHrReport(file);
    const stores = this.getSoresFromHrReport(report);
    await this.updateStores(stores);
  };

  private updateStores = async (stores: HrReportStore[]): Promise<void> => {
    const codes1C = stores.map(store => store.code1C);
    await storesService.markDeleteByCode1C(codes1C);
    await storesService.updateByCode1C(stores);
  };

  private getSoresFromHrReport = (hrReport: HrReport): HrReportStore[] => {
    const codes1C: Store['code1C'][] = [];
    const stores: HrReportStore[] = [];
    hrReport.forEach(({ store }) => {
      if (!codes1C.includes(store.code1C)) {
        codes1C.push(store.code1C);
        stores.push(store);
      }
    });
    return stores;
  };
}

export const updateService = new UpdateService();
