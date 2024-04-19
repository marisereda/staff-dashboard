import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { useEmployeesStore } from '../state';
import { Employee } from '../types';

type EmployeesTableRowProps = {
  employee: Employee;
};

export const EmployeesTableRow = ({ employee }: EmployeesTableRowProps) => {
  const {
    name,
    isFop,
    inn,
    employer,
    code1C,
    store,
    storeAddressBuh,
    phone,
    position,
    positionBuh,
  } = employee;

  const openForm = useEmployeesStore(s => s.openForm);

  const handleEditEmployee = () => {
    openForm(employee);
  };

  return (
    <TableRow
      sx={theme => ({
        '&:nth-of-type(even)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': { border: 0 },
      })}
    >
      <TableCell component="th" scope="row">
        <Typography variant="caption" sx={theme => ({ color: theme.palette.grey[600] })}>
          {isFop && <ManageAccountsIcon />}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {inn}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography variant="caption" sx={theme => ({ color: theme.palette.grey[600] })}>
          {code1C ?? '-'}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {position ?? '-'}
        </Typography>
        <Typography variant="caption" sx={theme => ({ color: theme.palette.grey[600] })}>
          {positionBuh ?? '-'}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="caption" sx={theme => ({ color: theme.palette.grey[600] })}>
          {employer?.name}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {store?.address ?? '-'}
        </Typography>
        <Typography variant="caption" sx={theme => ({ color: theme.palette.grey[600] })}>
          {storeAddressBuh ?? '-'}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography variant="caption" sx={theme => ({ color: theme.palette.grey[600] })}>
          {phone}
        </Typography>
      </TableCell>
      <TableCell>
        <IconButton color="success" onClick={handleEditEmployee}>
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
