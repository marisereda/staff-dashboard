import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { useDeleteEmployer } from '../queries/useDeleteEmployer';
import { useEmployersStore } from '../state';
import { Employer } from '../types';

type EmployersTableRowProps = {
  employer: Employer;
};

export const EmployersTableRow = ({ employer }: EmployersTableRowProps) => {
  const { id, inn, name, isSingleTax } = employer;
  const isFromOpen = useEmployersStore(s => s.isFormOpen);
  const openForm = useEmployersStore(s => s.openForm);
  const { mutate: deleteEmployer, isPending } = useDeleteEmployer();

  const isButtonsDisabled = isFromOpen || isPending;

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
        <Typography variant="subtitle2" sx={theme => ({ color: theme.palette.grey[600] })}>
          {isSingleTax ? 'єдина система' : 'загальна система'}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <IconButton color="success" disabled={isButtonsDisabled} onClick={() => openForm(employer)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" disabled={isButtonsDisabled} onClick={() => deleteEmployer(id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
