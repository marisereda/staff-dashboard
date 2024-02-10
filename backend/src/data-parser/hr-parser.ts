import { WorkSheet } from 'xlsx';
import { cell, isRowEmpty, isRowValid, readWorkSheet, rowLevel } from '../lib/utils';
import { HrReport, HrReportEmployee, HrReportStore } from './type/hr-report.type';

class HrParser {
  parseReport = (fileName: Buffer): HrReport => {
    const ws = readWorkSheet(fileName);

    if (!this.isSheetValid(ws)) throw new Error('Invalid sheet format');

    return this.parseTable(ws);
  };

  parseTable = (ws: WorkSheet): HrReport => {
    let row = 8;
    let store: HrReportStore | null = null;
    const result: HrReport = [];

    while (!isRowEmpty(ws, row, 1, 5)) {
      if (this.isStore(ws, row)) store = this.parseStore(ws, row);

      if (this.isEmployee(ws, row)) {
        if (!store) throw new Error('Invalid table format (employer or store not found)');
        result.push({ store, employee: { ...this.parseEmployee(ws, row) } });
      }

      row += 1;
    }

    return result;
  };

  private isSheetValid = (ws: WorkSheet): boolean => {
    return (
      isRowValid(ws, 1, 1, ['Список працівників організації']) &&
      isRowValid(ws, 6, 1, ['№ у групі', 'Таб. №', 'Працівник', 'ДРФО', 'Посада'])
    );
  };

  private isStore = (ws: WorkSheet, r: number): boolean => {
    return rowLevel(ws, r) === 1;
  };

  private isEmployee = (ws: WorkSheet, r: number): boolean => {
    return rowLevel(ws, r) === 2;
  };

  private parseStore = (ws: WorkSheet, r: number): HrReportStore => {
    return { address: cell(ws, r, 1), code1C: cell(ws, r, 2) };
  };

  private parseEmployee = (ws: WorkSheet, r: number): HrReportEmployee => {
    return {
      code1C: cell(ws, r, 2),
      inn: cell(ws, r, 4),
      name: cell(ws, r, 3),
      position: cell(ws, r, 5),
    };
  };
}

export const hrParser = new HrParser();
