import { Table, TableBody } from '@mui/material';
import { TableHead } from '../../common/components/TableHead';
import { EMPLOYEES_HEAD_COLUMNS } from '../constants';
import { useEmployeesStore } from '../state';
import { EmployeeResponse } from '../types';
import { EmployeesTableRow } from './EmployeesTableRow';

type EmployeesTableProps = {
  empoloyees: EmployeeResponse[];
};

export const EmployeesTable = ({ empoloyees }: EmployeesTableProps) => {
  const sortBy = useEmployeesStore(s => s.sortBy);
  const sortOrder = useEmployeesStore(s => s.sortOrder);
  const setSorting = useEmployeesStore(s => s.setSorting);

  return (
    <Table aria-label="simple table">
      <TableHead
        columns={EMPLOYEES_HEAD_COLUMNS}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSorting}
      />
      <TableBody>
        {empoloyees.map(empoloyee => (
          <EmployeesTableRow key={empoloyee.id} employee={empoloyee} />
        ))}
      </TableBody>
    </Table>
  );
};
