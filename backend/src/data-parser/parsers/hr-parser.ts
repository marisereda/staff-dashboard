import { WorkSheet } from 'xlsx';
import {
  isRowEmpty,
  isSheetValid,
  parseRow,
  readWorkSheet,
  rowLevel,
} from '../../common/utils/xlsx';
import { HrReportEmployee, HrReportStore } from '../types';

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

const PARSE: {
  startRow: number;
  colNumber: number;
  employee: Record<keyof Omit<HrReportEmployee, 'store'>, number>;
  store: Record<keyof HrReportStore, number>;
} = {
  startRow: 8,
  colNumber: 6,
  employee: {
    code1C: 2,
    inn: 4,
    name: 3,
    position: 5,
    phone: 6,
  },
  store: {
    addressHr: 1,
    code1C: 2,
  },
};

class HrParser {
  parseReport = (file: Buffer): HrReportEmployee[] => {
    const ws = readWorkSheet(file);

    if (!isSheetValid(ws, VALIDATION.header)) throw new Error('Invalid sheet format');

    return this.parseTable(ws);
  };

  parseTable = (ws: WorkSheet): HrReportEmployee[] => {
    let row = PARSE.startRow;
    let store: HrReportStore | null = null;
    const result: HrReportEmployee[] = [];

    while (!isRowEmpty(ws, row, 1, PARSE.colNumber)) {
      if (this.isStore(ws, row)) {
        store = parseRow<HrReportStore>(ws, row, PARSE.store);
      }

      if (this.isEmployee(ws, row)) {
        if (!store) {
          throw new Error('Invalid table format (employer or store not found)');
        }
        const employee = parseRow(ws, row, PARSE.employee);
        result.push({ ...employee, store });
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
