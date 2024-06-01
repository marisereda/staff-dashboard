import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Grid, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { UpdateStatus } from '../../common/enums';
import { makeShortName } from '../../common/utils/makeShortName';
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
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography component="span" key={id} variant="subtitle2" sx={{ fontWeight: 600 }}>
                {position}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography component="span" key={id} variant="subtitle2" sx={{ fontWeight: 600 }}>
                {store.addressHr}
              </Typography>
            </Grid>
          </Grid>
        ))}
        {workplacesBuh.map(({ id, position, store, employer }) => (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography
                key={id}
                variant="caption"
                sx={theme => ({ color: theme.palette.grey[600] })}
              >
                {position}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                key={id}
                variant="caption"
                sx={theme => ({ color: theme.palette.grey[600] })}
              >
                {store.addressBuh}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                key={id}
                variant="caption"
                sx={theme => ({ color: theme.palette.grey[600] })}
              >
                {makeShortName(employer.name)}
              </Typography>
            </Grid>
          </Grid>
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
