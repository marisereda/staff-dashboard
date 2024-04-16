import XLSX from 'xlsx';
import { HttpError } from '~/common/utils';
import { dataParserService } from '~/data-parser/data-parser.service';
import { FopReport } from '~/data-parser/types/fop-report.types';
import { employeesService } from '~/employees/employees.service';

class UpdateFopService {
  updateFromReport = async (file: Buffer): Promise<Buffer | null> => {
    const report = dataParserService.parseFopReport(file);
    if (report.length === 0) {
      throw new HttpError(400, 'Check uploading file, there is no information about FOP in it');
    }

    await this.updateEmployee(report);
    const listOfNotFoundFops = await this.createListOfNotFoundFops(report);
    if (!listOfNotFoundFops) {
      return null;
    }
    return this.createFile(listOfNotFoundFops);
  };

  private updateEmployee = async (report: FopReport[]): Promise<void> => {
    await employeesService.updateAll({ isFop: false });
    const employeeData = { isFop: true };
    const inns = report.map(fopData => fopData.inn);
    await employeesService.updateManyByInn(inns, employeeData);
  };

  private createListOfNotFoundFops = async (report: FopReport[]): Promise<FopReport[] | null> => {
    const inns = report.map(fopData => fopData.inn);
    const fopsOfEmployeesInns = (await employeesService.getManyByInn(inns)).map(
      fopOfEmployee => fopOfEmployee.inn
    );

    const notFoundFops = report.filter(fopData => !fopsOfEmployeesInns.includes(fopData.inn));
    return notFoundFops.length > 0 ? notFoundFops : null;
  };

  private createFile = (data: FopReport[]): Promise<Buffer> => {
    const header = ['ІПН', 'ПІБ'];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');
    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  };
}

export const updateFopService = new UpdateFopService();
