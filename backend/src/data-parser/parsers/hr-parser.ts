import { WorkSheet } from 'xlsx';
import { isRowEmpty, isSheetValid, parseRow, readWorkSheet, rowLevel } from '../../common/utils';
import { HrReport, HrReportEmployee, HrReportStore } from '../types';

const VALIDATION = {
  header: [
    { row: 1, colsValues: ['Список працівників організації'] },
    {
      row: 6,
      colsValues: [
        '№ у групі',
        'Таб. №',
        'Працівник',
        'ДРФО',
        'Посада',
        'Працівник.Фіз.особа.Телефон поиск',
      ],
    },
  ],
  store: {
    level: 1,
  },
  employee: {
    level: 2,
  },
};

const PARSE = {
  store: {
    address: 1,
    code1C: 2,
  },

  employee: {
    code1C: 2,
    inn: 4,
    name: 3,
    position: 5,
    phone: 6,
  },
};

class HrParser {
  parseReport = (file: Buffer): HrReport => {
    const ws = readWorkSheet(file);

    if (!isSheetValid(ws, VALIDATION.header)) throw new Error('Invalid sheet format');

    return this.parseTable(ws);
  };

  parseTable = (ws: WorkSheet): HrReport => {
    let row = 8;
    let store: HrReportStore | null = null;
    const result: HrReport = [];

    while (!isRowEmpty(ws, row, 1, 6)) {
      if (this.isStore(ws, row)) {
        store = parseRow<HrReportStore>(ws, row, PARSE.store);
      }

      if (this.isEmployee(ws, row)) {
        if (!store) throw new Error('Invalid table format (employer or store not found)');
        const employee = parseRow<HrReportEmployee>(ws, row, PARSE.employee);
        result.push({ store, employee });
      }

      row += 1;
    }

    return result;
  };

  private isStore = (ws: WorkSheet, r: number): boolean => {
    return rowLevel(ws, r) === VALIDATION.store.level;
  };

  private isEmployee = (ws: WorkSheet, r: number): boolean => {
    return rowLevel(ws, r) === VALIDATION.employee.level;
  };
}

export const hrParser = new HrParser();
