import { Employer, Prisma } from '@prisma/client';
import e from 'cors';
import { omit } from 'ramda';
import XLSX from 'xlsx';
import { prisma } from '~/common/services';
import { convertBigIntToInt } from '~/common/utils';
import { getInitials } from '~/common/utils/string-utils';
import { employersService } from '~/employers/employers.service';
import { storesService } from '~/stores/stores.service';
import { detailsSQL, totalsSQL } from './sql-queries';

class Report {
  async getReport(): Promise<void> {
    // const rows = [
    //   { name: 'George Washington', birthday: '1732-02-22' },
    //   { name: 'John Adams', birthday: '1735-10-19' },
    // ];

    const { header, rows } = await this.prepareRows();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');
    XLSX.writeFile(workbook, '../!!!.local/Presidents.xlsx', { compression: true });
  }

  async prepareRows(): Promise<{ header: string[]; rows: Record<string, unknown>[] }> {
    const totals: Record<string, string | number>[] = await prisma.$queryRaw(totalsSQL);
    const details: Record<string, unknown>[] = await prisma.$queryRaw(detailsSQL);
    const employers = await prisma.employer.findMany();

    const result = totals.map(row => {
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
    });

    const header = [
      '№',
      'Адреса магазину',
      'Всього',
      'Всього прац.',
      'ФОП',
      'Єдин.',
      ...employers
        .filter(employer => !employer.isSingleTax)
        .map(employer => getInitials(employer.name)),
    ];

    const rows = result.map(item => omit(['storeId'], convertBigIntToInt(item)));

    return { header, rows };
  }

  async prepareHeader() {
    return {};
  }
}

export const reportService = new Report();

//   const storesPage = await storesService.getAll({
//     q: '',
//     employerId: '',
//     storeId: '',
//     sortBy: 'address',
//     sortOrder: 'asc',
//     page: 1,
//   });

//   const employersPage = await employersService.getAll({
//     q: '',
//     storeId: '',
//     employerId: '',
//     sortBy: 'name',
//     sortOrder: 'asc',
//     page: 1,
//     pageSize: 50,
//   });

//   const employers = employersPage.data;
//   const stores = storesPage.data;

//   const preparedData = stores.map(store => {
//     const partOfRow: Record<string, number> = {};

//     for (const employer of employers) {
//       const amountEmployees = this.countEmployees(store.code1C, employer);
//       partOfRow[employer.name] = amountEmployees;
//     }

//     return {
//       'Код 1С': store.code1C,
//       'Адреса магазину': store.address,
//       ...partOfRow,
//     };
//   });

//   console.log('⚠️ preparedData:', preparedData);
// }

// countEmployees(code1c: string, employer: Employer): number {
//   return 10;
// }
