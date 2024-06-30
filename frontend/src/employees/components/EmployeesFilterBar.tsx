import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useEmployersQuery } from '../../employers/queries/useEmployersQuery';
import { useStoresQuery } from '../../stores/queries/useStoresQuery';
import { useEmployeesStore } from '../state';
import { EmployeesSearchParams } from '../types';

export function EmployeesFilterBar() {
  const search = useEmployeesStore(s => s.q);
  const storeId = useEmployeesStore(s => s.storeId);
  const employerId = useEmployeesStore(s => s.employerId);
  const fopFilter = useEmployeesStore(s => s.fopFilter);
  const statusFilter = useEmployeesStore(s => s.statusFilter);
  const noteFilter = useEmployeesStore(s => s.noteFilter);
  const setSearch = useEmployeesStore(s => s.setSearch);
  const setFopFilter = useEmployeesStore(s => s.setFopFilter);
  const setStatusFilter = useEmployeesStore(s => s.setStatusFilter);
  const setNoteFilter = useEmployeesStore(s => s.setNoteFilter);
  const setStoreId = useEmployeesStore(s => s.setStoreId);
  const setEmployerId = useEmployeesStore(s => s.setEmployerId);
  const setPage = useEmployeesStore(s => s.setPage);

  const { data: storesPage } = useStoresQuery({
    q: '',
    employerId,
    sortBy: 'addressHr',
    sortOrder: 'asc',
    page: 1,
  });

  const storesOptions =
    storesPage?.data.map(store => ({ label: store.addressHr || store.addressBuh, id: store.id })) ??
    [];

  let currentStoreOption;
  if (storesOptions.length > 0 && storeId) {
    currentStoreOption = storesOptions.find(option => option.id === storeId);
  }

  const { data: employersPage } = useEmployersQuery({
    q: '',
    storeId,
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
  });

  const employersOptions =
    employersPage?.data.map(employer => ({ label: employer.name, id: employer.id })) ?? [];

  let currentEmployerOption;
  if (employersOptions.length > 0 && employerId) {
    currentEmployerOption = employersOptions.find(option => option.id === employerId);
  }

  return (
    <Stack direction="row" spacing={3}>
      <Autocomplete
        disablePortal
        options={employersOptions}
        value={currentEmployerOption || null}
        sx={{ width: '40%' }}
        onChange={(_, value) => {
          setEmployerId(value ? value.id : '');
          setPage(1);
        }}
        renderInput={params => <TextField {...params} label="Роботодавець" />}
      />
      <Autocomplete
        disablePortal
        options={storesOptions}
        value={currentStoreOption || null}
        sx={{ width: '40%' }}
        onChange={(_, value) => {
          setStoreId(value ? value.id : '');
          setPage(1);
        }}
        renderInput={params => <TextField {...params} label="Адреса магазина" />}
      />
      <FormControl sx={{ width: '20%' }}>
        <InputLabel id="demo-simple-select-label">Самозайнята особа</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fopFilter}
          label="Самозайнята особа"
          onChange={e => {
            setFopFilter(e.target.value as EmployeesSearchParams['fopFilter']);
            setPage(1);
          }}
        >
          <MenuItem value={'all'}>Всі</MenuItem>
          <MenuItem value={'true'}>Тільки ФОП</MenuItem>
          <MenuItem value={'false'}>Тільки не ФОП</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: '20%' }}>
        <InputLabel id="dismissal">Звільнення</InputLabel>
        <Select
          labelId="dismissal"
          id="dismissal-select"
          value={statusFilter}
          label="Звільнення"
          onChange={e => {
            setStatusFilter(e.target.value as EmployeesSearchParams['statusFilter']);
            setPage(1);
          }}
        >
          <MenuItem value={'all'}>Всі</MenuItem>
          <MenuItem value={'hrDeleted'}>HR звільнення</MenuItem>
          <MenuItem value={'buhDeleted'}>Бух.звільнення</MenuItem>
          <MenuItem value={'allDeleted'}>Всі звільнення</MenuItem>
          <MenuItem value={'notDeleted'}>Без звільнень</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: '20%' }}>
        <InputLabel id="notes">Нотатки</InputLabel>
        <Select
          labelId="notes"
          id="notes-select"
          value={noteFilter}
          label="Нотатки"
          onChange={e => {
            setNoteFilter(e.target.value as EmployeesSearchParams['noteFilter']);
            setPage(1);
          }}
        >
          <MenuItem value={'all'}>Всі</MenuItem>
          <MenuItem value={'notes'}>Всі нотатки</MenuItem>
          <MenuItem value={'isDone'}>Виконані</MenuItem>
          <MenuItem value={'notDone'}>Невиконані</MenuItem>
          <MenuItem value={'isImportant'}>Важливі</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        InputProps={{ startAdornment: <SearchIcon /> }}
        sx={{ maxWidth: 500, width: '100%', alignSelf: 'center' }}
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
      />
    </Stack>
  );
}
