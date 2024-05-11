import { Prisma } from '@prisma/client';
import { UpdateStatus } from '~/common/enums';
import { HttpError } from '~/common/errors';
import { prisma } from '~/common/services';
import { dataParserService } from '~/data-parser/data-parser.service';
import { HrReportEmployee, HrReportStore } from '~/data-parser/types';

class UpdateHrService {
  updateFromReport = async (file: Buffer): Promise<void> => {
    const report = dataParserService.parseHrReport(file);

    await prisma.$transaction(async tx => {
      const employeesCodes1CFromReport = report.map(({ code1C }) => code1C);

      await tx.workplaceHr.deleteMany();
      await tx.employee.updateMany({
        where: { code1C: { notIn: employeesCodes1CFromReport } },
        data: { updateStatusHr: UpdateStatus.DELETE },
      });

      const updatedStores = await Promise.all(
        this.getStoresFromReport(report).map(store =>
          tx.store.upsert({
            where: { code1C: store.code1C },
            update: { ...store, updateStatus: UpdateStatus.SUCCESS },
            create: { ...store, updateStatus: UpdateStatus.NOT_FOUND },
          })
        )
      );

      for (const { store, position, inn, ...employeeData } of report) {
        const updatedStore = updatedStores.find(({ code1C }) => code1C === store.code1C);

        const data: Prisma.EmployeeCreateInput = {
          ...employeeData,
          inn: inn || null,
          workplacesHr: { create: { storeId: updatedStore!.id, position } },
        };

        const employeeByInn = inn ? await tx.employee.findUnique({ where: { inn } }) : null;

        if (employeeByInn && !employeeByInn.code1C) {
          await Promise.all([
            tx.employee.delete({
              where: { code1C: employeeData.code1C },
            }),
            tx.employee.update({ where: { inn }, data: { code1C: employeeData.code1C } }),
          ]);
        } else if (employeeByInn && employeeByInn.code1C !== employeeData.code1C) {
          throw new HttpError(
            409,
            `Failed to update HrReport: found duplicate employee ${JSON.stringify(
              employeeByInn
            )} when updating ${JSON.stringify(employeeData)}`
          );
        }

        await tx.employee.upsert({
          where: { code1C: employeeData.code1C },
          update: { ...data, updateStatusHr: UpdateStatus.SUCCESS },
          create: { ...data, updateStatusHr: UpdateStatus.NOT_FOUND },
        });
      }
    });
  };

  // private updateDeleteStatusEmployees = async (
  //   tx: PrismaClient,
  //   report: HrReportEmployee[]
  // ): Promise<void> => {
  //   const employeesCodes1CFromReport = report.map(({ code1C }) => code1C);
  //   const numberOfUpdatedEmployees = await prisma.employee.updateMany({
  //     where: { code1C: { notIn: employeesCodes1CFromReport } },
  //     data: { updateStatus: UpdateStatus.DELETE },
  //   });
  //   console.log('🚧 numberOfUpdatedEmployees:', numberOfUpdatedEmployees);
  // };

  private getStoresFromReport = (report: HrReportEmployee[]): HrReportStore[] => {
    return report.reduce((acc: HrReportStore[], { store }) => {
      const isStoreSaved = acc.find(({ code1C }) => code1C === store.code1C);
      return isStoreSaved ? acc : [...acc, store];
    }, []);
  };
}

export const updateHrService = new UpdateHrService();
