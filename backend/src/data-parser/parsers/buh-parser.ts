import { WorkSheet } from 'xlsx';
import { isRowEmpty, isSheetValid, parseRow, readWorkSheet, rowLevel } from '../../common/utils';
import { BuhReport, BuhReportEmployee, BuhReportEmployer, BuhReportStore } from '../types';

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
    storeAddreessBuh: 2,
  },
  employee: {
    inn: 5,
    name: 3,
    positionBuh: 4,
  },
  employer: {
    name: 2,
  },
};

class BuhParser {
  parseReport = (file: Buffer): BuhReport => {
    const ws = readWorkSheet(file);

    if (!isSheetValid(ws, VALIDATION.header)) throw new Error('Invalid sheet format');

    return this.parseTable(ws);
  };

  private parseTable = (ws: WorkSheet): BuhReport => {
    let row = PARSE.startRow;
    let employer: BuhReportEmployer | null = null;
    let store: BuhReportStore | null = null;
    const result: BuhReport = [];

    while (!isRowEmpty(ws, row, 1, PARSE.colNumber)) {
      if (this.isEmployer(ws, row)) {
        employer = parseRow<BuhReportEmployer>(ws, row, PARSE.employer);
      }

      if (this.isStore(ws, row)) {
        store = parseRow<BuhReportStore>(ws, row, PARSE.store);
      }

      if (this.isEmployee(ws, row)) {
        if (!employer || !store)
          throw new Error('Invalid table format (employer or store not found)');
        const employee = parseRow<BuhReportEmployee>(ws, row, PARSE.employee);
        result.push({
          employer,
          employee: { ...employee, ...store },
        });
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
