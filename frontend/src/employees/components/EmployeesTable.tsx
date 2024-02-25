import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { TABLE_HEAD } from '../constants';
import { Employee } from '../types';

type EmployeesTableProps = {
  empoloyees: Employee[];
};

export const EmployeesTable = ({ empoloyees }: EmployeesTableProps) => {
  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {TABLE_HEAD.map(({ primaryLabel, secondaryLabel }, index) => (
            <TableCell key={index} align="left">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {primaryLabel}
              </Typography>
              <Typography variant="caption" color={grey[600]}>
                {secondaryLabel}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {empoloyees.map(row => (
          <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              <Typography variant="caption" color={grey[600]}>
                {row.isFop && <ManageAccountsIcon />}
              </Typography>
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {row.inn}
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {row.name}
              </Typography>
              <Typography variant="caption" color={grey[600]}>
                {row.code1C ?? '-'}
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {row.position ?? '-'}
              </Typography>
              <Typography variant="caption" color={grey[600]}>
                {row.positionBuh ?? '-'}
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="caption" color={grey[600]}>
                {row.employer?.name}
              </Typography>
            </TableCell>

            <TableCell align="left">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {row.store?.address ?? '-'}
              </Typography>
              <Typography variant="caption" color={grey[600]}>
                {row.storeAddreessBuh ?? '-'}
              </Typography>
            </TableCell>

            <TableCell align="left">
              <Typography variant="caption" color={grey[600]}>
                {row.phone}
              </Typography>
            </TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // </TableContainer>
  );
};
