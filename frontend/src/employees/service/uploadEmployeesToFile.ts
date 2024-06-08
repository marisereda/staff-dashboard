import XLSX from 'xlsx';
import { makeShortName } from '../../common/utils/makeShortName';
import { Employee } from '../types';

export const uploadEmployeesToFile = (employees: Employee[], storeId: string) => {
  const rows = employees.map((employee, i) => ({
    number: (i + 1).toString(),
    name: employee.name,
    positionsHr: getEmployeeHrPositions(employee, storeId),
    positionsBuh: getEmployeeBuhPositions(employee, storeId),
    employer: getEmployeeEmployer(employee, storeId),
    isFop: employee.isFop ? 'ФОП' : '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [['№', 'ПІБ', 'Посада HR', 'Посада бух.', 'Роботодавець', 'ФОП']],
    {
      origin: 'A1',
    }
  );

  worksheet['!cols'] = getColumnsWidth(rows);
  XLSX.writeFile(workbook, getFileName(employees[0], storeId), { compression: true });
};

const getEmployeeEmployer = (employee: Employee, storeId: string) => {
  const employers = employee.workplacesBuh.map(workplace =>
    storeId === workplace.storeId ? makeShortName(workplace.employer.name) : null
  );
  return employers.join(', ');
};

const getEmployeeHrPositions = (employee: Employee, storeId: string) => {
  const positions = employee.workplacesHr.map(workplace =>
    storeId === workplace.storeId ? workplace.position : 'Позаштат.'
  );
  return positions.length > 0 ? positions.join(', ') : 'Позаштат.';
};

const getEmployeeBuhPositions = (employee: Employee, storeId: string) => {
  const positions = employee.workplacesBuh.map(workplace =>
    storeId === workplace.storeId ? workplace.position : null
  );
  return positions.join(', ');
};

const getColumnsWidth = (rows: Record<string, string>[]) => {
  const rowKeys = Object.keys(rows[0]);
  const columnsWidth: { wch: number }[] = [];
  rowKeys.forEach(key => {
    const max_width = rows.reduce((w, row) => Math.max(w, row[key].length), 5);
    columnsWidth.push({ wch: max_width });
  });
  return columnsWidth;
};

const getFileName = (employee: Employee, storeId: string) => {
  const storeAddress = employee.workplacesHr.find(workplace => workplace.storeId === storeId)?.store
    .addressHr;
  return `${storeAddress}.xlsx`;
};
