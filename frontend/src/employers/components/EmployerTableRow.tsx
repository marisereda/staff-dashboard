import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { useDeleteEmployer } from '../queries/useDeleteEmployer';
import { Employer } from '../types';

type EmployersTableRowProps = {
  employer: Employer;
};

export const EmployersTableRow = ({ employer }: EmployersTableRowProps) => {
  const { id, inn, name, storeAddressesBuh } = employer;
  const { mutate, isPending } = useDeleteEmployer();

  const stores = storeAddressesBuh ? storeAddressesBuh.split('\n') : undefined;

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
          {inn ?? '-'}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
      </TableCell>
      {/*
      <TableCell align="left">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {storeAddressesBuh}
        </Typography>
      </TableCell> */}

      <TableCell align="left">
        {stores?.map((address, index) => (
          <Typography
            key={index}
            variant="subtitle2"
            sx={theme => ({ color: theme.palette.grey[600] })}
          >
            {address ?? '-'}
          </Typography>
        ))}
      </TableCell>

      <TableCell align="right">
        <IconButton color="success" disabled={isPending}>
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          disabled={isPending}
          onClick={() => {
            console.log('idDeleting', id);
            mutate(id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
