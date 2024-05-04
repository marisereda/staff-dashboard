import { Divider, Stack, TablePagination } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { StoreForm } from '../components/StoreForm';
import { StoresFilterBar } from '../components/StoresFilterBar';
import { StoresTable } from '../components/StoresTable';
import { useStoresQuery } from '../queries/useStoresQuery';
import { useStoresStore } from '../state';

export const StoresPage = () => {
  const search = useStoresStore(s => s.search);
  const storeId = useStoresStore(s => s.storeId);

  const sortBy = useStoresStore(s => s.sortBy);
  const sortOrder = useStoresStore(s => s.sortOrder);
  const page = useStoresStore(s => s.page);
  const pageSize = useStoresStore(s => s.pageSize);
  const setPage = useStoresStore(s => s.setPage);
  const setPageSize = useStoresStore(s => s.setPageSize);

  const [debouncedSearch] = useDebounce<string>(search, 500);

  const { data: storesPage } = useStoresQuery({
    q: debouncedSearch,
    storeId,
    sortBy,
    sortOrder,
    page,
    pageSize,
  });

  return (
    <Stack spacing={3}>
      <StoresFilterBar />
      {storesPage && (
        <>
          <StoresTable stores={storesPage.data} />
          <Divider component="div" />
          <TablePagination
            component="div"
            count={storesPage.total}
            page={page - 1}
            labelRowsPerPage="Рядків:"
            rowsPerPage={pageSize}
            rowsPerPageOptions={[5, 10, 25, 50]}
            onPageChange={(_, page) => setPage(page + 1)}
            onRowsPerPageChange={e => setPageSize(Number(e.target.value))}
          />
        </>
      )}
      <StoreForm />
    </Stack>
  );
};
