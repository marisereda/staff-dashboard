import { dataParserService } from '~/data-parser/data-parser.service';
import { BuhReport, BuhReportEmployer } from '~/data-parser/types';
import { employeesService } from '~/employees/employees.service';
import { employersService } from '~/employers/employers.service';

class UpdateBuhService {
  updateFromReport = async (file: Buffer, inn: string): Promise<void> => {
    const report = dataParserService
      .parseBuhReport(file)
      .map(item => ({ ...item, employer: { ...item.employer, inn } }));

    await this.updateEmployers(report);
    await this.updateEmployees(report);
  };

  private updateEmployers = async (report: BuhReport): Promise<void> => {
    const employers = this.getEmployersFromReport(report);
    await employersService.updateByInn(employers);
  };

  private updateEmployees = async (report: BuhReport): Promise<void> => {
    const employees = report.map(({ employee, employer }) => ({
      ...employee,
      employer: { inn: employer.inn },
    }));
    await employeesService.updateByInn(employees);
  };
  private getEmployersFromReport = (report: BuhReport): BuhReportEmployer[] => {
    const employers: BuhReportEmployer[] = [];
    report.forEach(({ employer }) => {
      const isEmployerSaved = employers.find(({ inn }) => employer.inn === inn);
      if (!isEmployerSaved) {
        employers.push(employer);
      }
    });
    return employers;
  };
}

export const updateBuhService = new UpdateBuhService();
