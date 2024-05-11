import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { UpdateStatus } from '../../common/enums';
import { useDeleteEmployee } from '../queries/useDeleteEmployee';
import { useEmployeesStore } from '../state';
import { Employee } from '../types';

type EmployeesTableRowProps = {
  employee: Employee;
};

export const EmployeesTableRow = ({ employee }: EmployeesTableRowProps) => {
  const {
    id,
    name,
    isFop,
    inn,
    code1C,
    phone,
    workplacesHr,
    workplacesBuh,
    updateStatusHr,
    updateStatusBuh,
  } = employee;
  const isFormOpen = useEmployeesStore(s => s.isFormOpen);
  const openForm = useEmployeesStore(s => s.openForm);
  const { mutate: deleteEmployee, isPending } = useDeleteEmployee();

  const isButtonsDisabled = isFormOpen || isPending;

  return (
    <TableRow
      sx={theme => ({
        '&:nth-of-type(even)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': { border: 0 },
      })}
    >
      <TableCell>
        <Typography sx={theme => ({ color: theme.palette.grey[600] })}>
          {isFop && <ManageAccountsIcon />}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {inn}
        </Typography>
        <Typography variant="caption" sx={theme => ({ color: theme.palette.grey[600] })}>
          {code1C ?? '-'}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography variant="caption" sx={theme => ({ color: theme.palette.grey[600] })}>
          {phone}
        </Typography>
      </TableCell>

      <TableCell>
        {workplacesHr.map(({ id, position, store }) => (
          <Typography key={id} variant="subtitle2" sx={{ fontWeight: 600 }}>
            {`${position} в ${store.addressHr}`}
          </Typography>
        ))}
        {workplacesBuh.map(({ id, position, store, employer }) => (
          <Typography key={id} variant="caption" sx={theme => ({ color: theme.palette.grey[600] })}>
            {`${position} в ${store.addressBuh} (${employer.name})`}
          </Typography>
        ))}
      </TableCell>

      <TableCell>
        {updateStatusBuh === UpdateStatus.DELETE || updateStatusHr === UpdateStatus.DELETE ? (
          <IconButton color="error" disabled={isButtonsDisabled} onClick={() => deleteEmployee(id)}>
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton
            color="success"
            disabled={isButtonsDisabled}
            onClick={() => openForm(employee)}
          >
            <EditIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};
