import { Divider, Stack, TablePagination } from '@mui/material';
import { useDebounce } from 'use-debounce';

import { EmployerForm } from '../components/EmployerForm';
import { EmployersFilterBar } from '../components/EmployersFilterBar';
import { EmployersTable } from '../components/EmployersTable';
import { useEmployersQuery } from '../queries/useEmployersQuery';
import { useEmployersStore } from '../state';

export const EmployersPage = () => {
  const search = useEmployersStore(s => s.search);
  const storeId = useEmployersStore(s => s.storeId);
  const sortBy = useEmployersStore(s => s.sortBy);
  const sortOrder = useEmployersStore(s => s.sortOrder);
  const page = useEmployersStore(s => s.page);
  const pageSize = useEmployersStore(s => s.pageSize);

  const setPage = useEmployersStore(s => s.setPage);
  const setPageSize = useEmployersStore(s => s.setPageSize);

  const [debouncedSearch] = useDebounce<string>(search, 500);

  const { data: employersPage } = useEmployersQuery({
    q: debouncedSearch,
    storeId,
    sortBy,
    sortOrder,
    page,
    pageSize,
  });

  return (
    <Stack spacing={3}>
      <EmployersFilterBar />
      {employersPage && (
        <>
          <EmployersTable employers={employersPage.data} />
          <Divider component="div" />
          <TablePagination
            component="div"
            count={employersPage.total}
            page={page - 1}
            labelRowsPerPage="Рядків:"
            rowsPerPage={pageSize}
            rowsPerPageOptions={[5, 10, 25, 50]}
            onPageChange={(_, page) => setPage(page + 1)}
            onRowsPerPageChange={e => setPageSize(Number(e.target.value))}
          />
        </>
      )}
      <EmployerForm />
    </Stack>
  );
};
