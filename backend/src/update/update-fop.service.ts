import XLSX from 'xlsx';
import { HttpError } from '~/common/errors';
import { prisma } from '~/common/services';
import { dataParserService } from '~/data-parser/data-parser.service';
import { FopReportEmployee } from '~/data-parser/types/fop-report.types';

class UpdateFopService {
  updateFromReport = async (file: Buffer): Promise<Buffer | null> => {
    const report = dataParserService.parseFopReport(file);
    if (report.length === 0) {
      throw new HttpError(400, 'Check uploading file, there is no information about FOP in it');
    }

    await this.updateEmployees(report);

    const notFoundFops = await this.getNotFoundFops(report);
    if (notFoundFops.length) {
      return this.createFile(notFoundFops);
    }
    return null;
  };

  private updateEmployees = (report: FopReportEmployee[]): Promise<void> => {
    const inns = this.getInnsFromReport(report);
    return prisma.$transaction(async tx => {
      await tx.employee.updateMany({
        data: { isFop: false },
      });
      await tx.employee.updateMany({
        where: { inn: { in: inns } },
        data: { isFop: true },
      });
    });
  };

  private getNotFoundFops = async (report: FopReportEmployee[]): Promise<FopReportEmployee[]> => {
    const inns = this.getInnsFromReport(report);
    const updatedEmployees = await prisma.employee.findMany({
      where: { inn: { in: inns } },
    });
    const updatedInns = updatedEmployees.map(({ inn }) => inn);
    return report.filter(({ inn }) => !updatedInns.includes(inn));
  };

  private createFile = (data: FopReportEmployee[]): Promise<Buffer> => {
    const header = ['ІПН', 'ПІБ'];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');

    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  };

  private getInnsFromReport(report: FopReportEmployee[]): string[] {
    return report.map(({ inn }) => inn).filter(Boolean);
  }
}

export const updateFopService = new UpdateFopService();
