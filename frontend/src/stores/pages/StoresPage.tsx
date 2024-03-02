import SearchIcon from '@mui/icons-material/Search';
import { Stack, TablePagination, TextField } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { StoresTable } from '../components/StoresTable';
import { useStoresQuery } from '../queries/useStoresQuery';
import { useStoresStore } from '../state';

export const StoresPage = () => {
  const search = useStoresStore(s => s.search);
  const sortBy = useStoresStore(s => s.sortBy);
  const sortOrder = useStoresStore(s => s.sortOrder);
  const page = useStoresStore(s => s.page);
  const pageSize = useStoresStore(s => s.pageSize);

  const setSearch = useStoresStore(s => s.setSearch);
  const setPage = useStoresStore(s => s.setPage);
  const setPageSize = useStoresStore(s => s.setPageSize);

  const [debouncedSearch] = useDebounce<string>(search, 500);

  const { data: storesPage } = useStoresQuery({
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
        variant="outlined"
        InputProps={{ startAdornment: <SearchIcon /> }}
        sx={{ maxWidth: 500, width: '100%', alignSelf: 'center' }}
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
      />
      {storesPage && (
        <>
          <StoresTable stores={storesPage.data} />
          <TablePagination
            component="div"
            count={storesPage.total}
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
