import { Employee, Prisma, PrismaClient } from '@prisma/client';
import { UpdateStatus } from '~/common/enums';
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
        data: { updateStatus: UpdateStatus.DELETE },
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

      for (const { store, position, ...employeeData } of report) {
        const updatedStore = updatedStores.find(({ code1C }) => code1C === store.code1C);
        const data: Prisma.EmployeeCreateInput = {
          ...employeeData,
          workplacesHr: { create: { storeId: updatedStore!.id, position } },
        };

        let employee: Employee;
        // 1)
        if (employeeData.code1C && !employeeData.inn) {
          employee = await tx.employee.upsert({
            where: { code1C: employeeData.code1C },
            update: { ...data, updateStatus: UpdateStatus.SUCCESS },
            create: { ...data, updateStatus: UpdateStatus.NOT_FOUND },
          });
          console.log('🚧 employee:', employee);
        }
        // 2)
        else if (employeeData.code1C && employeeData.inn) {
          const currentEmployee = await tx.employee.findUnique({
            where: { code1C: employeeData.code1C, inn: employeeData.inn },
          });
          // 2.1)
          if (currentEmployee) {
            employee = await tx.employee.update({
              where: {
                id: currentEmployee.id,
              },
              data: { ...data, updateStatus: UpdateStatus.SUCCESS },
            });
          }
          // 2.2
          else {
            const employeeCreatedByBuh = await tx.employee.findUnique({
              where: { inn: employeeData.inn },
            });
            const employeeCreatedByHr = await tx.employee.findUnique({
              where: { code1C: employeeData.code1C },
            });
            //2.3
            if (employeeCreatedByBuh && employeeCreatedByHr) {
              await tx.employee.delete({ where: { id: employeeCreatedByHr.id } });
              employee = await tx.employee.update({
                where: { id: employeeCreatedByBuh.id },
                data: { ...data, updateStatus: UpdateStatus.SUCCESS },
              });
            } else if (!employeeCreatedByBuh && employeeCreatedByHr) {
              employee = await tx.employee.update({
                where: { id: employeeCreatedByHr.id },
                data: { ...data, updateStatus: UpdateStatus.SUCCESS },
              });
            } else if (employeeCreatedByBuh && !employeeCreatedByHr) {
              employee = await tx.employee.update({
                where: { id: employeeCreatedByBuh.id },
                data: { ...data, updateStatus: UpdateStatus.SUCCESS },
              });
            }
          }
        }

        // await Promise.all(
        //   report.map(({ store, position, ...employeeData }) => {
        //     const updatedStore = updatedStores.find(({ code1C }) => code1C === store.code1C);
        //     const data: Prisma.EmployeeCreateInput = {
        //       ...employeeData,
        //       workplacesHr: { create: { storeId: updatedStore!.id, position } },
        //     };
        //     console.log('🚧 data:', data);

        //     return tx.employee.upsert({
        //       where: { code1C: employeeData.code1C },
        //       update: { ...data, updateStatus: UpdateStatus.SUCCESS },
        //       create: { ...data, updateStatus: UpdateStatus.NOT_FOUND },
        //     });
        //   })
        // );
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
