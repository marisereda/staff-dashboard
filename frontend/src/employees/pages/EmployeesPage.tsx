import { Divider, Stack, TablePagination } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { EmployeesTable } from '../components';
import { EmployeeForm } from '../components/EmployeeForm';
import { EmployeesFilterBar } from '../components/EmployeesFilterBar';
import { useEmployeesQuery } from '../queries';
import { useEmployeesStore } from '../state';

export const EmployeesPage = () => {
  const search = useEmployeesStore(s => s.search);
  const fopFilter = useEmployeesStore(s => s.fopFilter);
  const storeId = useEmployeesStore(s => s.storeId);
  const employerId = useEmployeesStore(s => s.employerId);
  const sortBy = useEmployeesStore(s => s.sortBy);
  const sortOrder = useEmployeesStore(s => s.sortOrder);
  const page = useEmployeesStore(s => s.page);
  const pageSize = useEmployeesStore(s => s.pageSize);

  const setPage = useEmployeesStore(s => s.setPage);
  const setPageSize = useEmployeesStore(s => s.setPageSize);

  const [debouncedSearch] = useDebounce<string>(search, 500);

  const { data: employeesPage } = useEmployeesQuery({
    q: debouncedSearch,
    fopFilter,
    storeId,
    employerId,
    sortBy,
    sortOrder,
    page,
    pageSize,
  });

  return (
    <Stack spacing={3}>
      <EmployeesFilterBar />
      {employeesPage && (
        <>
          <EmployeesTable employees={employeesPage.data} />
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
      <EmployeeForm />
    </Stack>
  );
};
