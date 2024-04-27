import { UpdateStatus } from '~/common/enums';
import { prisma } from '~/common/services';
import { dataParserService } from '~/data-parser/data-parser.service';

class UpdateBuhService {
  updateFromReport = async (file: Buffer, employerId: string): Promise<void> => {
    const report = dataParserService.parseBuhReport(file);
    if (!report.length) {
      throw new Error('Invalid report structure');
    }

    await prisma.$transaction(async tx => {
      await tx.employeeEmployer.deleteMany({
        where: { employerId },
      });

      await tx.employer.update({
        where: { id: employerId },
        data: report[0]!.employer,
      });

      await Promise.all(
        report.map(({ employer: _, store, position, inn, ...employeeData }) => {
          const data = {
            inn: inn || null,
            ...employeeData,
            employeeEmployers: {
              create: { employerId, positionBuh: position, storeAddressBuh: store.address },
            },
          };
          return tx.employee.upsert({
            where: { inn },
            update: { ...data, updateStatus: UpdateStatus.SUCCESS },
            create: { ...data, updateStatus: UpdateStatus.NOT_FOUND },
          });
        })
      );
    });
  };
}

export const updateBuhService = new UpdateBuhService();
