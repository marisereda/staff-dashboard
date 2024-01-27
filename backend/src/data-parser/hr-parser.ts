import { WorkSheet } from 'xlsx';
import { cell, isRowEmpty, isRowValid, readWorkSheet, rowLevel } from '../lib/utils';
import { HrReport, HrReportEmployee, HrReportStore } from './type/hr-report.type';

export const parseReport = (fileName: string): HrReport => {
  const ws = readWorkSheet(fileName);

  if (!isSheetValid(ws)) throw new Error('Invalid sheet format');

  return parseTable(ws);
};

const parseTable = (ws: WorkSheet): HrReport => {
  let row = 8;
  let store: HrReportStore | null = null;
  const result: HrReport = [];

  while (!isRowEmpty(ws, row, 1, 5)) {
    if (isStore(ws, row)) store = parseStore(ws, row);

    if (isEmployee(ws, row)) {
      if (!store) throw new Error('Invalid table format (employer or store not found)');
      result.push({ store, employee: { ...parseEmployee(ws, row) } });
    }

    row += 1;
  }

  return result;
};

const isSheetValid = (ws: WorkSheet): boolean => {
  return (
    isRowValid(ws, 1, 1, ['Список працівників організації']) &&
    isRowValid(ws, 6, 1, ['№ у групі', 'Таб. №', 'Працівник', 'ДРФО', 'Посада'])
  );
};

const isStore = (ws: WorkSheet, r: number): boolean => {
  return rowLevel(ws, r) === 1;
};

const isEmployee = (ws: WorkSheet, r: number): boolean => {
  return rowLevel(ws, r) === 2;
};

const parseStore = (ws: WorkSheet, r: number): HrReportStore => {
  return { address: cell(ws, r, 1), code1C: cell(ws, r, 2) };
};

const parseEmployee = (ws: WorkSheet, r: number): HrReportEmployee => {
  return {
    inn: cell(ws, r, 4),
    name: cell(ws, r, 3),
    position: cell(ws, r, 5),
  };
};
