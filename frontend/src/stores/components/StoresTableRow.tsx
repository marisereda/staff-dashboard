import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { useStoresStore } from '../state';
import { Store } from '../types';

type StoresTableRowProps = {
  store: Store;
};

export const StoresTableRow = ({ store }: StoresTableRowProps) => {
  const { code1C, address, employers, checkoutNumber } = store;

  const isFormOpen = useStoresStore(s => s.isFormOpen);
  const openForm = useStoresStore(s => s.openForm);

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

      <TableCell align="right">
        <IconButton color="success" disabled={isFormOpen} onClick={() => openForm(store)}>
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
