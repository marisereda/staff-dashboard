import { Table, TableBody } from '@mui/material';

import { Employee } from '../types';
import { EmployeesTableHead } from './EmployeesTableHead';
import { EmployeesTableRow } from './EmployeesTableRow';

type EmployeesTableProps = {
  empoloyees: Employee[];
};

export const EmployeesTable = ({ empoloyees }: EmployeesTableProps) => {
  return (
    <Table aria-label="simple table">
      <EmployeesTableHead />
      <TableBody>
        {empoloyees.map(empoloyee => (
          <EmployeesTableRow employee={empoloyee} />
        ))}
      </TableBody>
    </Table>
  );
};
