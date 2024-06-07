import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Stack, TextField } from '@mui/material';

import { useEmployersQuery } from '../../employers/queries/useEmployersQuery';
import { useStoresStore } from '../state';

export function StoresFilterBar() {
  const search = useStoresStore(s => s.q);
  const employerId = useStoresStore(s => s.employerId);
  const setSearch = useStoresStore(s => s.setSearch);
  const setEmployerId = useStoresStore(s => s.setEmployerId);
  const { data: employersPage } = useEmployersQuery({
    q: '',
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
  });

  const employersOptions =
    employersPage?.data.map(employer => ({ label: employer.name, id: employer.id })) ?? [];

  const currentEmployerOption = employersOptions.find(option => option.id === employerId);

  return (
    <Stack direction="row" spacing={3} sx={{ justifyContent: 'right' }}>
      <Autocomplete
        disablePortal
        options={employersOptions}
        value={currentEmployerOption || null}
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
