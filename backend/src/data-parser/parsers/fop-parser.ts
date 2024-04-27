import { WorkSheet } from 'xlsx';
import { cell, readAllWorkSheets } from '~/common/utils';
import { FopReportEmployee } from '../types/fop-report.types';

const EMPTY_NUMBER = 10;

class FopParser {
  parseReport = (file: Buffer): FopReportEmployee[] => {
    const ws: { [sheet: string]: WorkSheet } = readAllWorkSheets(file);

    const parseWorkBookResult = Object.keys(ws).reduce((acc: FopReportEmployee[], sheet) => {
      const parseSheetResult = this.parseWorkSheet(ws[sheet]!);
      return [...acc, ...parseSheetResult];
    }, []);

    return parseWorkBookResult;
  };

  parseCell = (cellContent: string): FopReportEmployee | null => {
    const regex = /\b\d{10}\b/;
    const match = cellContent.match(regex);
    if (!match) {
      return null;
    }

    const inn = match[0];
    const name = cellContent.split(inn)[0]!.trim();

    return { inn, name };
  };

  parseRow = (ws: WorkSheet, r: number): FopReportEmployee[] | null => {
    let colNum = 1;
    const rowData = [];
    let emptyCellNumber = 0;
    let isRowEmpty = true;

    while (colNum) {
      const cellContent = cell(ws, r, colNum);

      if (!cellContent) {
        emptyCellNumber++;
      } else {
        emptyCellNumber = 0;
        isRowEmpty = false;
      }
      if (emptyCellNumber > EMPTY_NUMBER) {
        break;
      }
      const parseCellResult = this.parseCell(cellContent);

      if (parseCellResult) {
        rowData.push(parseCellResult);
      }
      colNum++;
    }

    return isRowEmpty ? null : rowData;
  };

  parseWorkSheet = (ws: WorkSheet): FopReportEmployee[] => {
    let row = 1;
    let emptyRowNumber = 0;
    let sheetData: FopReportEmployee[] = [];
    while (row) {
      if (emptyRowNumber > EMPTY_NUMBER) {
        break;
      }
      const rowData = this.parseRow(ws, row);

      if (!rowData) {
        emptyRowNumber++;
      } else {
        emptyRowNumber = 0;
        sheetData = [...sheetData, ...rowData];
      }
      row++;
    }
    return sheetData;
  };
}

export const fopParser = new FopParser();
