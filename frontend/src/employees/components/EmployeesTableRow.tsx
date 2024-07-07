import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Grid, IconButton, Stack, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { UpdateStatus } from '../../common/enums';
import { makeShortName } from '../../common/utils/makeShortName';
import { useNoteStore } from '../../notes/state';
import { useEmployeesStore } from '../state';
import { Employee } from '../types';

type EmployeesTableRowProps = {
  employee: Employee;
};

type NoteColor =
  | 'default'
  | 'inherit'
  | 'error'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning';

export const EmployeesTableRow = ({ employee }: EmployeesTableRowProps) => {
  const {
    name,
    isFop,
    inn,
    code1C,
    phone,
    workplacesHr,
    workplacesBuh,
    updateStatusHr,
    updateStatusBuh,
    note,
  } = employee;
  const isFormOpen = useEmployeesStore(s => s.isFormOpen);
  const openForm = useEmployeesStore(s => s.openForm);
  const setDeletingEmployee = useEmployeesStore(s => s.setDeletingEmployee);
  const setEmployeeIdToNote = useNoteStore(s => s.setEmployeeId);

  let noteColor: NoteColor = 'default';
  if (note) {
    noteColor = 'primary';
  }
  if (note?.isImportant) {
    noteColor = 'warning';
  }
  if (note?.isDone) {
    noteColor = 'success';
  }

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
          <Grid key={id} container spacing={2}>
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
          <Grid key={id} container spacing={2}>
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
        <Stack direction="row">
          {updateStatusBuh === UpdateStatus.DELETE || updateStatusHr === UpdateStatus.DELETE ? (
            <IconButton
              color="error"
              disabled={isFormOpen}
              onClick={() => setDeletingEmployee(employee)}
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton color="success" disabled={isFormOpen} onClick={() => openForm(employee)}>
              <EditIcon />
            </IconButton>
          )}
          <Tooltip title={employee.note?.content}>
            <IconButton
              color={noteColor}
              disabled={isFormOpen}
              onClick={() => {
                setEmployeeIdToNote(employee.id);
              }}
            >
              {note ? note.isDone ? <ChecklistRtlIcon /> : <DescriptionIcon /> : <NoteAddIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
