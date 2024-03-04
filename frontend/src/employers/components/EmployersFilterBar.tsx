import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { useEmployersQuery } from '../queries/useEmployersQuery';
import { useEmployersStore } from '../state';

export function EmployersFilterBar() {
  const search = useEmployersStore(s => s.search);
  const setSearch = useEmployersStore(s => s.setSearch);
  const setEmployerId = useEmployersStore(s => s.setEmployerId);

  const { data: employersPage } = useEmployersQuery({
    q: '',
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
  });

  const employersOptions =
    employersPage?.data.map(employer => ({ label: employer.name, id: employer.id })) ?? [];

  return (
    <Stack direction="row" spacing={3} sx={{ justifyContent: 'right' }}>
      <Autocomplete
        disablePortal
        options={employersOptions}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{ width: '40%' }}
        onChange={(_, value) => setEmployerId(value ? value.id : '')}
        renderInput={params => <TextField {...params} label="Роботодавець" />}
      />
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
