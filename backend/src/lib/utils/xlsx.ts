import fs from 'fs';
import xlsx, { WorkSheet } from 'xlsx';

export const readWorkSheetFromFile = (fileName: string): WorkSheet => {
  xlsx.set_fs(fs);

  const wb = xlsx.readFile(fileName, { dense: true });
  if (!wb.SheetNames.length) throw new Error('Sheets not found in file');

  const ws = wb.Sheets[wb.SheetNames[0]!];
  if (!ws) throw new Error('Sheets not found in file');

  return ws;
};

export const readWorkSheet = (file: Buffer): WorkSheet => {
  const wb = xlsx.read(file, { dense: true });
  if (!wb.SheetNames.length) throw new Error('Sheets not found in file');

  const ws = wb.Sheets[wb.SheetNames[0]!];
  if (!ws) throw new Error('Sheets not found in file');

  return ws;
};

export const cell = (ws: WorkSheet, r: number, c: number): string => {
  const cell = ws['!data']?.[r - 1]?.[c - 1];
  const val = cell?.w ?? '';
  return val.trim();
};

export const rowLevel = (ws: WorkSheet, r: number): number => {
  const row = ws['!rows']?.[r - 1];
  return row?.level ?? 0;
};

export const isRowValid = (ws: WorkSheet, r: number, startC: number, values: string[]): boolean => {
  return values.every((value, index) => cell(ws, r, startC + index) === value);
};

export const isRowEmpty = (ws: WorkSheet, r: number, startC: number, colNum = 10): boolean => {
  return Array(colNum)
    .fill(null)
    .every((_, index) => !cell(ws, r, startC + index));
};
