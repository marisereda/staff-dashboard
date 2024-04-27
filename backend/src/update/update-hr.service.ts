import { UpdateStatus } from '~/common/enums';
import { prisma } from '~/common/services';
import { dataParserService } from '~/data-parser/data-parser.service';
import { HrReportEmployee, HrReportStore } from '~/data-parser/types';

class UpdateHrService {
  updateFromReport = async (file: Buffer): Promise<void> => {
    const report = dataParserService.parseHrReport(file);

    await prisma.$transaction(async tx => {
      await tx.employeeStore.deleteMany();

      const updatedStores = await Promise.all(
        this.getStoresFromReport(report).map(store =>
          tx.store.upsert({
            where: { code1C: store.code1C },
            update: { ...store, updateStatus: UpdateStatus.SUCCESS },
            create: { ...store, updateStatus: UpdateStatus.NOT_FOUND },
          })
        )
      );

      await Promise.all(
        report.map(({ store, position, code1C, inn, ...employeeData }) => {
          const updatedStore = updatedStores.find(({ code1C }) => code1C === store.code1C);
          const data = {
            code1C: code1C || null,
            inn: inn || null,
            ...employeeData,
            employeeStores: { create: { storeId: updatedStore!.id, positionHr: position } },
          };
          return tx.employee.upsert({
            where: { code1C },
            update: { ...data, updateStatus: UpdateStatus.SUCCESS },
            create: { ...data, updateStatus: UpdateStatus.NOT_FOUND },
          });
        })
      );
    });
  };

  private getStoresFromReport = (report: HrReportEmployee[]): HrReportStore[] => {
    return report.reduce((acc, { store }) => {
      const isStoreSaved = acc.find(({ code1C }) => code1C === store.code1C);
      return isStoreSaved ? acc : [...acc, store];
    }, [] as HrReportStore[]);
  };
}

export const updateHrService = new UpdateHrService();
