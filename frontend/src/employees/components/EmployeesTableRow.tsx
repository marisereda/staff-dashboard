import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { useEmployeesStore } from '../state';
import { EmployeeEmployer, EmployeeResponse, EmployeeStore } from '../types';

type EmployeesTableRowProps = {
  employee: EmployeeResponse;
};

export const EmployeesTableRow = ({ employee }: EmployeesTableRowProps) => {
  const { name, isFop, inn, code1C, phone, employeeStores, employeeEmployers } = employee;

  const positionsHr = employeeStores?.length
    ? employeeStores.map((item: EmployeeStore) => item.positionHr)
    : ['-'];
  const positionsBuh = employeeEmployers?.length
    ? employeeEmployers.map((item: EmployeeEmployer) => item.positionBuh)
    : ['-'];
  const addressesHr = employeeStores?.length
    ? employeeStores.map((item: EmployeeStore) => item.store.address)
    : ['-'];
  const employers = employeeEmployers?.length
    ? employeeEmployers.map((item: EmployeeEmployer) => item.employer.name)
    : ['-'];
  const addressesBuh = employeeEmployers?.length
    ? employeeEmployers.map(item => item.storeAddressBuh)
    : ['-'];



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
          {positionsHr.map((positionHr: string) => (
            <p>{positionHr}</p>
          ))}
        </Typography>
        <Typography variant="caption" sx={theme => ({ color: theme.palette.grey[600] })}>
          {positionsBuh.map((positionBuh: string) => (
            <p>{positionBuh}</p>
          ))}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography variant="caption" sx={theme => ({ color: theme.palette.grey[600] })}>
          {employers.map((employer: string) => (
            <p>{employer}</p>
          ))}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {addressesHr.map((address: string) => (
            <p>{address}</p>
          ))}
        </Typography>
        <Typography variant="caption" sx={theme => ({ color: theme.palette.grey[600] })}>
          {addressesBuh.map((addressBuh: string) => (
            <p>{addressBuh}</p>
          ))}
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
