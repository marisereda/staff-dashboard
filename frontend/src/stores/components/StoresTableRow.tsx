import { TableCell, TableRow, Typography } from '@mui/material';
import { Store } from '../types';

type StoresTableRowProps = {
  store: Store;
};

export const StoresTableRow = ({ store }: StoresTableRowProps) => {
  const { code1C, address, employers, checkoutNumber } = store;

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
          {code1C ?? '-'}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {address}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {checkoutNumber ?? '-'}
        </Typography>
      </TableCell>

      <TableCell align="left">
        {employers?.map(({ name }, index) => (
          <Typography
            key={index}
            variant="subtitle2"
            sx={theme => ({ color: theme.palette.grey[600] })}
          >
            {name ?? '-'}
          </Typography>
        ))}
      </TableCell>
    </TableRow>
  );
};
