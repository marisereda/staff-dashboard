import { Divider, Stack, TablePagination } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { EmployeesTable } from '../components';
import { EmployeesFilterBar } from '../components/EmployeesFilterBar';
import { SearchParams, useEmployeesQuery } from '../queries';
import { useEmployeesStore } from '../state';

export const EmployeesPage = () => {
  const search = useEmployeesStore(s => s.search);
  const sortBy = useEmployeesStore(s => s.sortBy);
  const fopFilter = useEmployeesStore(s => s.fopFilter);
  const sortOrder = useEmployeesStore(s => s.sortOrder);
  const page = useEmployeesStore(s => s.page);
  const pageSize = useEmployeesStore(s => s.pageSize);

  const setPage = useEmployeesStore(s => s.setPage);
  const setPageSize = useEmployeesStore(s => s.setPageSize);

  const [debouncedSearch] = useDebounce<string>(search, 500);

  const searchParams: SearchParams = {
    q: debouncedSearch,
    sortBy,
    sortOrder,
    page,
    pageSize,
  };

  if (fopFilter !== 'all') {
    searchParams.isFop = fopFilter;
  }

  const { data: employeesPage } = useEmployeesQuery(searchParams);

  return (
    <Stack spacing={3}>
      <EmployeesFilterBar />
      {employeesPage && (
        <>
          <EmployeesTable empoloyees={employeesPage.data} />
          <Divider component="div" />
          <TablePagination
            component="div"
            count={employeesPage.total}
            page={page - 1}
            labelRowsPerPage="Рядків:"
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
