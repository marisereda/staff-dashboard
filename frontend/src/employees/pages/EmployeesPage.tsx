import SearchIcon from '@mui/icons-material/Search';
import { Stack, TextField } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { EmployeesTable } from '../components';
import { useEmployeesQuery } from '../queries';
import { useEmployeesStore } from '../state';

export const EmployeesPage = () => {
  const search = useEmployeesStore(s => s.search);
  const setSearch = useEmployeesStore(s => s.setSearch);
  const sortBy = useEmployeesStore(s => s.sortBy);
  const sortOrder = useEmployeesStore(s => s.sortOrder);

  const [debouncedSearch] = useDebounce<string>(search, 500);

  const { data: employeesPage } = useEmployeesQuery({ q: debouncedSearch, sortBy, sortOrder });

  return (
    <Stack spacing={3}>
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        InputProps={{ startAdornment: <SearchIcon /> }}
        sx={{ maxWidth: 500, width: '100%', alignSelf: 'center' }}
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
      />
      {employeesPage && <EmployeesTable empoloyees={employeesPage.data} />}
    </Stack>
  );
};
