import { Table, TableBody } from '@mui/material';
import { TableHead } from '../../common/components/TableHead';
import { EMPLOYEES_HEAD_COLUMNS } from '../constants';
import { useEmployeesStore } from '../state';
import { Employee } from '../types';
import { EmployeesTableRow } from './EmployeesTableRow';

type EmployeesTableProps = {
  employees: Employee[];
};

export const EmployeesTable = ({ employees }: EmployeesTableProps) => {
  const sortBy = useEmployeesStore(s => s.sortBy);
  const sortOrder = useEmployeesStore(s => s.sortOrder);
  const setSorting = useEmployeesStore(s => s.setSorting);

  return (
    <Table>
      <TableHead
        columns={EMPLOYEES_HEAD_COLUMNS}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSorting}
      />
      <TableBody>
        {employees.map(employee => (
          <EmployeesTableRow key={employee.id} employee={employee} />
        ))}
      </TableBody>
    </Table>
  );
};
