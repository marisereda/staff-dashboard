import { forEach } from 'ramda';
import { dataParserService } from '~/data-parser/data-parser.service';
import { employeesService } from '~/employees/employees.service';
import { employersService } from '~/employers/employers.service';

class UpdateBuhService {
  updateFromReport = async (file: Buffer, employerId: string): Promise<void> => {
    const report = dataParserService.parseBuhReport(file);
    if (!report.length) {
      throw new Error('Invalid report structure');
    }

    const storeAddresses = report.map(({ employee }) => employee.storeAddressBuh);

    const stores: string[] = [];
    if (storeAddresses[0]) {
      stores.push(storeAddresses[0]);

      storeAddresses.forEach(address => {
        if (!stores.includes(address)) {
          stores.push(address);
        }
      });
    }
    const storeAddressesBuh = stores.join('\n');

    await employersService.update(employerId, {
      name: report[0]!.employer.name,
      storeAddressesBuh,
    });

    const employees = report.map(({ employee }) => ({
      ...employee,
      employerId,
    }));

    await employeesService.updateMany(employees);
  };
}

export const updateBuhService = new UpdateBuhService();
