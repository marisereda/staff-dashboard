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

export function EmployeesFilterBar() {
  const search = useEmployeesStore(s => s.search);
  const storeId = useEmployeesStore(s => s.storeId);
  const employerId = useEmployeesStore(s => s.employerId);
  const fopFilter = useEmployeesStore(s => s.fopFilter);
  const setSearch = useEmployeesStore(s => s.setSearch);
  const setFopFilter = useEmployeesStore(s => s.setFopFilter);
  const setStoreId = useEmployeesStore(s => s.setStoreId);
  const setEmployerId = useEmployeesStore(s => s.setEmployerId);

  const { data: storesPage } = useStoresQuery({
    q: '',
    sortBy: 'address',
    sortOrder: 'asc',
    page: 1,
  });

  const storesOptions =
    storesPage?.data.map(store => ({ label: store.address, id: store.id })) ?? [];

  let currentStoreOption;
  if (storesOptions.length > 0 && storeId) {
    currentStoreOption = storesOptions.find(option => option.id === storeId);
  }

  const { data: employersPage } = useEmployersQuery({
    q: '',
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
        onChange={(_, value) => setEmployerId(value ? value.id : '')}
        renderInput={params => <TextField {...params} label="Роботодавець" />}
      />
      <Autocomplete
        disablePortal
        options={storesOptions}
        value={currentStoreOption || null}
        sx={{ width: '40%' }}
        onChange={(_, value) => setStoreId(value ? value.id : '')}
        renderInput={params => <TextField {...params} label="Адреса магазина" />}
      />
      <FormControl sx={{ width: '20%' }}>
        <InputLabel id="demo-simple-select-label">Самозайнята особа</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fopFilter}
          label="Самозайнята особа"
          onChange={e => setFopFilter(e.target.value)}
        >
          <MenuItem value={'all'}>Всі</MenuItem>
          <MenuItem value={'true'}>Тільки ФОП</MenuItem>
          <MenuItem value={'false'}>Тільки не ФОП</MenuItem>
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
