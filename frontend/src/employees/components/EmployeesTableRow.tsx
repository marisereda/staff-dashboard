import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { TableCell, TableRow, Typography } from '@mui/material';
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
    storeAddreessBuh,
    phone,
    position,
    positionBuh,
  } = employee;

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
          {storeAddreessBuh ?? '-'}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography variant="caption" sx={theme => ({ color: theme.palette.grey[600] })}>
          {phone}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
