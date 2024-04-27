import { WorkSheet } from 'xlsx';
import { isRowEmpty, isSheetValid, parseRow, readWorkSheet, rowLevel } from '~/common/utils/xlsx';
import { BuhReportEmployee, BuhReportEmployer, BuhReportStore } from '../types';

const VALIDATION = {
  header: [
    { row: 1, colsValues: ['', 'Списки працівників організації'] },
    {
      row: 9,
      colsValues: ['', 'Табельний номер (регл)', 'ПІБ (повністю)', 'Посада (регл)', 'Код за ДРФО'],
    },
  ],
  employer: {
    level: 0,
  },
  store: {
    level: 1,
  },
  employee: {
    level: 2,
  },
};

const PARSE = {
  startRow: 10,
  colNumber: 5,
  store: {
    address: 2,
  },
  employee: {
    inn: 5,
    name: 3,
    position: 4,
  },
  employer: {
    name: 2,
  },
};

class BuhParser {
  parseReport = (file: Buffer): BuhReportEmployee[] => {
    const ws = readWorkSheet(file);

    if (!isSheetValid(ws, VALIDATION.header)) throw new Error('Invalid sheet format');

    return this.parseTable(ws);
  };

  private parseTable = (ws: WorkSheet): BuhReportEmployee[] => {
    let row = PARSE.startRow;
    let employer: BuhReportEmployer | null = null;
    let store: BuhReportStore | null = null;
    const result: BuhReportEmployee[] = [];

    while (!isRowEmpty(ws, row, 1, PARSE.colNumber)) {
      if (this.isEmployer(ws, row)) {
        employer = parseRow(ws, row, PARSE.employer);
      }

      if (this.isStore(ws, row)) {
        store = parseRow(ws, row, PARSE.store);
      }

      if (this.isEmployee(ws, row)) {
        if (!employer || !store)
          throw new Error('Invalid table format (employer or store not found)');
        const employee = parseRow(ws, row, PARSE.employee);
        result.push({ ...employee, employer, store });
      }

      row += 1;
    }

    return result;
  };

  private isEmployer = (ws: WorkSheet, r: number): boolean => {
    return rowLevel(ws, r) === VALIDATION.employer.level;
  };

  private isStore = (ws: WorkSheet, r: number): boolean => {
    return rowLevel(ws, r) === VALIDATION.store.level;
  };

  private isEmployee = (ws: WorkSheet, r: number): boolean => {
    return rowLevel(ws, r) === VALIDATION.employee.level;
  };
}

export const buhParser = new BuhParser();
