import { WorkSheet } from 'xlsx';
import { cell, isRowEmpty, isRowValid, readWorkSheet, rowLevel } from '../lib/utils';
import {
  BuhReport,
  BuhReportEmployee,
  BuhReportEmployer,
  BuhReportStore,
} from './type/buh-report.type';

export const parseReport = (fileName: string): BuhReport => {
  const ws = readWorkSheet(fileName);

  if (!isSheetValid(ws)) throw new Error('Invalid sheet format');

  return parseTable(ws);
};

const parseTable = (ws: WorkSheet): BuhReport => {
  let row = 10;
  let employer: BuhReportEmployer | null = null;
  let storeAddreessBuh: BuhReportStore | null = null;
  const result: BuhReport = [];

  while (!isRowEmpty(ws, row, 2, 4)) {
    if (isEmployer(ws, row)) employer = parseEmployer(ws, row);
    if (isStore(ws, row)) storeAddreessBuh = parseStore(ws, row);

    if (isEmployee(ws, row)) {
      if (!employer || !storeAddreessBuh)
        throw new Error('Invalid table format (employer or store not found)');
      result.push({ employer, employee: { ...parseEmployee(ws, row), ...storeAddreessBuh } });
    }

    row += 1;
  }

  return result;
};

const isSheetValid = (ws: WorkSheet): boolean => {
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

const isEmployer = (ws: WorkSheet, r: number): boolean => {
  return rowLevel(ws, r) === 0;
};

const isStore = (ws: WorkSheet, r: number): boolean => {
  return rowLevel(ws, r) === 1;
};

const isEmployee = (ws: WorkSheet, r: number): boolean => {
  return rowLevel(ws, r) === 2;
};

const parseEmployer = (ws: WorkSheet, r: number): BuhReportEmployer => {
  return { name: cell(ws, r, 2) };
};

const parseStore = (ws: WorkSheet, r: number): BuhReportStore => {
  return { storeAddreessBuh: cell(ws, r, 2) };
};

const parseEmployee = (ws: WorkSheet, r: number): BuhReportEmployee => {
  return {
    inn: cell(ws, r, 5),
    name: cell(ws, r, 3),
    position: cell(ws, r, 4),
  };
};
