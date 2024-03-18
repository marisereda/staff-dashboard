import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, Table, TableBody } from '@mui/material';
import { TableHead } from '../../common/components/TableHead';
import { EMPLOYERS_HEAD_COLUMNS } from '../constants';
import { useEmployersStore } from '../state';
import { Employer } from '../types';
import { EmployersTableRow } from './EmployerTableRow';

type Props = {
  employers: Employer[];
};

export const EmployersTable = ({ employers }: Props) => {
  const sortBy = useEmployersStore(s => s.sortBy);
  const sortOrder = useEmployersStore(s => s.sortOrder);
  const setSorting = useEmployersStore(s => s.setSorting);
  const openForm = useEmployersStore(s => s.openForm);

  return (
    <Table aria-label="simple table">
      <TableHead
        columns={EMPLOYERS_HEAD_COLUMNS}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSorting}
        renderActions={() => (
          <IconButton aria-label="delete" color="inherit" onClick={() => openForm(null)}>
            <AddCircleIcon />
          </IconButton>
        )}
      />
      <TableBody>
        {employers.map(employer => (
          <EmployersTableRow key={employer.id} employer={employer} />
        ))}
      </TableBody>
    </Table>
  );
};
