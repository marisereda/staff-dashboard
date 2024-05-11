import { Employer } from '@prisma/client';
import XLSX from 'xlsx';
import { prisma } from '~/common/services';
import { getInitials } from '~/common/utils/string-utils';
import { POSITION_CATEGORIES } from './constants';
import {
  EmployedInStore,
  PositionsInStore,
  StoreWithTotals,
  getEmployedInStoreSQL,
  getPositionsInStoreSQL,
  getStoresWithTotalsSQL,
} from './sql-queries';
import { FreelancersInStore, getFreelancersInStoreSQL } from './sql-queries/freelancers-in-store';

class Report {
  async getReport(): Promise<Buffer> {
    const { header, rows } = await this.prepareRows();
    const freelancers = await this.getFreelancers();
    const freelancersHeader = [
      'ІПН',
      'ПІБ',
      'Посада HR',
      'Посада бух.',
      'Роботодавець',
      'Адреса магазину бух.',
    ];
    const freelancersRows = freelancers.map(freelancer => [
      freelancer.employeeInn,
      freelancer.employeeName,
      freelancer.positionHr,
      freelancer.positionBuh,
      freelancer.employerName,
      freelancer.addressBuh,
    ]);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.sheet_new();
    const worksheetFreelancers = XLSX.utils.sheet_new();

    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(worksheet, rows, { origin: 'A2' });
    XLSX.utils.sheet_add_aoa(worksheetFreelancers, [freelancersHeader], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(worksheetFreelancers, freelancersRows, { origin: 'A2' });

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Дислокация');
    XLSX.utils.book_append_sheet(workbook, worksheetFreelancers, 'Внештат');

    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    ``;
  }

  async getFreelancers(): Promise<FreelancersInStore[]> {
    const stores = await prisma.store.findMany();

    const freelancers = await Promise.all(
      stores.map(store =>
        prisma.$queryRaw<FreelancersInStore[]>(getFreelancersInStoreSQL(store.id))
      )
    );
    return freelancers.flat();
  }

  async prepareRows(): Promise<{ header: string[]; rows: string[][] }> {
    const employers = await prisma.employer.findMany();
    const header = this.prepareHeader(employers);

    const storesWithTotals: StoreWithTotals[] = await prisma.$queryRaw(getStoresWithTotalsSQL());

    const employedInStores = await Promise.all(
      storesWithTotals.map(({ id }) =>
        prisma.$queryRaw<EmployedInStore[]>(getEmployedInStoreSQL(id))
      )
    );

    const positionsInStores = await Promise.all(
      storesWithTotals.map(({ id }) =>
        prisma.$queryRaw<PositionsInStore[]>(
          getPositionsInStoreSQL({ storeId: id, ...POSITION_CATEGORIES })
        )
      )
    );

    const rows = storesWithTotals.map((storeWithTotals, i) =>
      this.prepareRow({
        totals: storeWithTotals,
        employed: employedInStores[i]!,
        positions: positionsInStores[i]?.[0],
        employers,
      })
    );

    return { header, rows };
  }

  prepareRow({
    totals,
    employed,
    positions,
    employers,
  }: {
    totals: StoreWithTotals;
    employed: EmployedInStore[];
    positions?: PositionsInStore;
    employers: Employer[];
  }): string[] {
    const employedBySingleTax = employed.find(({ employerId }) => employerId === null)?.employees;

    const employedTotalByEmployers = employed.reduce(
      (acc, { employees }) => acc + Number(employees ?? 0),
      0
    );

    const employedByEmployers = employers
      .filter(({ isSingleTax }) => !isSingleTax)
      .map(({ id }) => {
        const data = employed.find(({ employerId }) => employerId === id);
        return (data?.employees || '').toString();
      });

    return [
      totals.rowNumber.toString(),
      totals.address ?? '',
      Number(totals.total || '').toString(),
      (Number(totals.fops ?? 0) + employedTotalByEmployers || '').toString(),
      (totals.fops || '').toString(),
      (employedTotalByEmployers || '').toString(),
      (employedBySingleTax || '').toString(),
      ...employedByEmployers,
      (totals.checkoutNumber || '').toString(),
      (
        (Number(totals.total ?? 0) <= 6
          ? Number(positions?.cashiers ?? 0) + Number(positions?.salers ?? 0)
          : positions?.cashiers ?? 0) || ''
      ).toString(),
      (positions?.managers || '').toString(),
    ];
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
      'прац.касири',
      'прац.керів-во',
    ];
  }
}

export const reportService = new Report();
