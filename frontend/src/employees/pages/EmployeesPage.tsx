import SearchIcon from '@mui/icons-material/Search';
import { Stack, TablePagination, TextField } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { EmployeesTable } from '../components';
import { useEmployeesQuery } from '../queries';
import { useEmployeesStore } from '../state';

export const EmployeesPage = () => {
  const search = useEmployeesStore(s => s.search);
  const sortBy = useEmployeesStore(s => s.sortBy);
  const sortOrder = useEmployeesStore(s => s.sortOrder);
  const page = useEmployeesStore(s => s.page);
  const pageSize = useEmployeesStore(s => s.pageSize);

  const setSearch = useEmployeesStore(s => s.setSearch);
  const setPage = useEmployeesStore(s => s.setPage);
  const setPageSize = useEmployeesStore(s => s.setPageSize);

  const [debouncedSearch] = useDebounce<string>(search, 500);

  const { data: employeesPage } = useEmployeesQuery({
    q: debouncedSearch,
    sortBy,
    sortOrder,
    page,
    pageSize,
  });

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
      {employeesPage && (
        <>
          <EmployeesTable empoloyees={employeesPage.data} />
          <TablePagination
            component="div"
            count={employeesPage.total}
            page={page - 1}
            rowsPerPage={pageSize}
            rowsPerPageOptions={[5, 10, 25, 50]}
            onPageChange={(_, page) => setPage(page + 1)}
            onRowsPerPageChange={e => setPageSize(Number(e.target.value))}
          />
        </>
      )}
    </Stack>
  );
};
