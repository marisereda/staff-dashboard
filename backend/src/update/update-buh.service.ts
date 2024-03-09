import { dataParserService } from '~/data-parser/data-parser.service';
import { employeesService } from '~/employees/employees.service';
import { employersService } from '~/employers/employers.service';

class UpdateBuhService {
  updateFromReport = async (file: Buffer, employerId: string): Promise<void> => {
    const report = dataParserService.parseBuhReport(file);
    if (!report.length) {
      throw new Error('Invalid report structure');
    }

    await employersService.update(employerId, report[0]!.employer);

    const employees = report.map(({ employee }) => ({
      ...employee,
      employerId,
    }));

    await employeesService.updateMany(employees);
  };
}

export const updateBuhService = new UpdateBuhService();
