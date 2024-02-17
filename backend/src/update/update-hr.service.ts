import { dataParserService } from '~/data-parser/data-parser.service';
import { HrReport, HrReportStore } from '~/data-parser/types';
import { employeesService } from '~/employees/employees.service';
import { storesService } from '~/stores/stores.service';

class UpdateHrService {
  updateFromReport = async (file: Buffer): Promise<void> => {
    const report = dataParserService.parseHrReport(file);
    await this.updateStores(report);
    await this.updateEmployees(report);
  };

  private updateEmployees = async (report: HrReport): Promise<void> => {
    const codes1C = report.map(({ employee }) => employee.code1C);
    const employees = report.map(({ employee, store }) => ({
      ...employee,
      store: { code1C: store.code1C },
    }));
    await employeesService.markDeleteByCode1C(codes1C);
    await employeesService.updateByCode1C(employees);
  };

  private updateStores = async (report: HrReport): Promise<void> => {
    const stores = this.getSoresFromReport(report);
    const codes1C = stores.map(store => store.code1C);
    await storesService.markDeleteByCode1C(codes1C);
    await storesService.updateByCode1C(stores);
  };

  private getSoresFromReport = (report: HrReport): HrReportStore[] => {
    const stores: HrReportStore[] = [];
    report.forEach(({ store }) => {
      const isStoreSaved = stores.find(({ code1C }) => store.code1C === code1C);
      if (!isStoreSaved) {
        stores.push(store);
      }
    });
    return stores;
  };
}

export const updateHrService = new UpdateHrService();
