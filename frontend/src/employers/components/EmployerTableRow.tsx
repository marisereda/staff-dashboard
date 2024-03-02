import { TableCell, TableRow, Typography } from '@mui/material';
import { Employer } from '../types';

type EmployersTableRowProps = {
  employer: Employer;
};

export const EmployersTableRow = ({ employer }: EmployersTableRowProps) => {
  const { inn, name, stores } = employer;

  return (
    <TableRow
      sx={theme => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': { border: 0 },
      })}
    >
      <TableCell component="th" scope="row">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {inn ?? '-'}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="left">
        {stores?.map(({ address }, index) => (
          <Typography
            key={index}
            variant="subtitle2"
            sx={theme => ({ color: theme.palette.grey[600] })}
          >
            {address ?? '-'}
          </Typography>
        ))}
      </TableCell>
    </TableRow>
  );
};
