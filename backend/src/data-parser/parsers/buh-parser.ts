import { WorkSheet } from 'xlsx';
import {
  cell,
  isRowEmpty,
  isRowValid,
  readWorkSheet,
  readWorkSheetFromFile,
  rowLevel,
} from '../../common/utils';
import {
  BuhReport,
  BuhReportEmployee,
  BuhReportEmployer,
  BuhReportStore,
} from '../types';

class BuhParser {
  parseReportFromFile = (fileName: string): BuhReport => {
    const ws = readWorkSheetFromFile(fileName);

    if (!this.isSheetValid(ws)) throw new Error('Invalid sheet format');

    return this.parseTable(ws);
  };

  parseReport = (file: Buffer): BuhReport => {
    const ws = readWorkSheet(file);

    if (!this.isSheetValid(ws)) throw new Error('Invalid sheet format');

    return this.parseTable(ws);
  };

  private parseTable = (ws: WorkSheet): BuhReport => {
    let row = 10;
    let employer: BuhReportEmployer | null = null;
    let storeAddreessBuh: BuhReportStore | null = null;
    const result: BuhReport = [];

    while (!isRowEmpty(ws, row, 2, 4)) {
      if (this.isEmployer(ws, row)) employer = this.parseEmployer(ws, row);
      if (this.isStore(ws, row)) storeAddreessBuh = this.parseStore(ws, row);

      if (this.isEmployee(ws, row)) {
        if (!employer || !storeAddreessBuh)
          throw new Error('Invalid table format (employer or store not found)');
        result.push({
          employer,
          employee: { ...this.parseEmployee(ws, row), ...storeAddreessBuh },
        });
      }

      row += 1;
    }

    return result;
  };

  private isSheetValid = (ws: WorkSheet): boolean => {
    return (
      isRowValid(ws, 1, 2, ['Списки працівників організації']) &&
      isRowValid(ws, 9, 2, [
        'Табельний номер (регл)',
        'ПІБ (повністю)',
        'Посада (регл)',
        'Код за ДРФО',
      ])
    );
  };

  private isEmployer = (ws: WorkSheet, r: number): boolean => {
    return rowLevel(ws, r) === 0;
  };

  private isStore = (ws: WorkSheet, r: number): boolean => {
    return rowLevel(ws, r) === 1;
  };

  private isEmployee = (ws: WorkSheet, r: number): boolean => {
    return rowLevel(ws, r) === 2;
  };

  private parseEmployer = (ws: WorkSheet, r: number): BuhReportEmployer => {
    return { name: cell(ws, r, 2) };
  };

  private parseStore = (ws: WorkSheet, r: number): BuhReportStore => {
    return { storeAddreessBuh: cell(ws, r, 2) };
  };

  private parseEmployee = (ws: WorkSheet, r: number): BuhReportEmployee => {
    return {
      inn: cell(ws, r, 5),
      name: cell(ws, r, 3),
      position: cell(ws, r, 4),
    };
  };
}

export const buhParser = new BuhParser();
