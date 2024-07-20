import { Prisma } from '@prisma/client';
import { UpdateStatus } from '~/common/enums';
import { prisma } from '~/common/services';
import { dataParserService } from '~/data-parser/data-parser.service';
import { BuhReportEmployee, BuhReportStore } from '~/data-parser/types';
import { employeesService } from '~/employees/employees.service';

class UpdateBuhService {
  updateFromReport = async (employerId: string, file: Buffer): Promise<void> => {
    const report = dataParserService.parseBuhReport(file);
    if (!report.length) {
      throw new Error('Invalid report structure');
    }

    await prisma.$transaction(async tx => {
      await tx.workplaceBuh.deleteMany({
        where: { employerId },
      });

      await tx.employer.update({
        where: { id: employerId },
        data: report[0]!.employer,
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

      await Promise.all([
        ...report.map(({ store, employer: _, position, ...employeeData }) => {
          const updatedStore = updatedStores.find(({ code1C }) => code1C === store.code1C);
          const data: Prisma.EmployeeCreateInput = {
            ...employeeData,
            workplacesBuh: {
              create: { storeId: updatedStore!.id, employerId, position },
            },
          };
          return tx.employee.upsert({
            where: { inn: employeeData.inn },
            update: { ...data, updateStatusBuh: UpdateStatus.SUCCESS },
            create: { ...data, updateStatusBuh: UpdateStatus.NOT_FOUND },
          });
        }),
      ]);

      // await employeesService.markFiredEmployeesAsDeleted();
    });
  };

  private getStoresFromReport = (report: BuhReportEmployee[]): BuhReportStore[] => {
    return report.reduce((acc: BuhReportStore[], { store }) => {
      const isStoreSaved = acc.find(({ code1C }) => code1C === store.code1C);
      return isStoreSaved ? acc : [...acc, store];
    }, []);
  };
}

export const updateBuhService = new UpdateBuhService();
