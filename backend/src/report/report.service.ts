import { Employer } from '@prisma/client';
import { omit } from 'ramda';
import XLSX from 'xlsx';
import { prisma } from '~/common/services';
import { convertBigIntToInt } from '~/common/utils';
import { getInitials } from '~/common/utils/string-utils';
import { POSITION_CATEGORIES } from './constants';
import {
  EmployeesByEmployers,
  employeesByEmployersQuery,
} from './sql-queries/employeesByEmployersQuery';
import {
  EmployeesByPosition,
  employeesByPositionQuery,
} from './sql-queries/employeesByPositionQuery';
import { ResultsByStore, resultsByStoresSQLQuery } from './sql-queries/resultsByStoresQuery';

class Report {
  async getReport(): Promise<Buffer> {
    const { header, rows } = await this.prepareRows();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');
    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  }

  async prepareRows(): Promise<{ header: string[]; rows: Record<string, unknown>[] }> {
    const resultsByStores: ResultsByStore[] = await prisma.$queryRaw(resultsByStoresSQLQuery);
    const employeesByEmployers: EmployeesByEmployers[] =
      await prisma.$queryRaw(employeesByEmployersQuery);

    const employeesByPosition: EmployeesByPosition[][] = await Promise.all(
      POSITION_CATEGORIES.map(async category =>
        prisma.$queryRaw(employeesByPositionQuery(category.positions))
      )
    );

    const employers = await prisma.employer.findMany();

    const result = resultsByStores.map(row => {
      const { storeCheckoutNumber, ...restRow } = row;
      const rowWithEmployers = this.addEmployerColumnsToRow(
        restRow,
        employers,
        employeesByEmployers
      );
      const rowWithPositions = this.addPositionColumnsToRow(
        { ...rowWithEmployers, storeCheckoutNumber },
        employeesByPosition
      );
      return rowWithPositions;
    });

    const header = this.prepareHeader(employers);
    const rows = result.map(item => omit(['storeId'], convertBigIntToInt(item)));

    return { header, rows };
  }

  addEmployerColumnsToRow(
    row: Record<string, unknown>,
    employers: Employer[],
    details: Record<string, unknown>[]
  ): Record<string, unknown> {
    return employers.reduce(
      (acc: Record<string, unknown>, employer) => {
        const employedCount = details.find(
          item => row['storeId'] === item['storeId'] && employer.id === item['employerId']
        )?.['employedCount'] as number;

        if (employer.isSingleTax) {
          acc['singleTax'] = (acc['singleTax'] as number) + Number(employedCount ?? 0);
        } else {
          acc[employer.id] = employedCount ?? 0;
        }

        return acc;
      },
      { ...row, singleTax: 0 }
    );
  }

  addPositionColumnsToRow(
    row: Record<string, unknown>,
    detailsByPosition: EmployeesByPosition[][]
  ): Record<string, unknown> {
    return detailsByPosition.reduce(
      (acc: Record<string, unknown>, storePositions, index) => {
        const employedCount = storePositions.find(item => item['storeId'] === row['storeId'])?.[
          'employedCount'
        ];
        acc['employedCount' + index] = employedCount;
        return acc;
      },
      { ...row }
    );
  }

  prepareHeader(employers: Employer[]): string[] {
    return [
      '№',
      'Адреса магазину',
      'Всього',
      'Прац.всього',
      'ФОП',
      'Прац.',
      'Єдин.',
      ...employers
        .filter(employer => !employer.isSingleTax)
        .map(employer => getInitials(employer.name)),
      'Кіл-ть кас',
      ...POSITION_CATEGORIES.map(category => category.name),
    ];
  }
}

export const reportService = new Report();
