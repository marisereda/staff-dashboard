import { Button, Divider, Stack, TablePagination, Typography } from '@mui/material';

import { useDebounce } from 'use-debounce';
import { EmployeesTable } from '../components';
import { EmployeeForm } from '../components/EmployeeForm';
import { EmployeesFilterBar } from '../components/EmployeesFilterBar';
import { getEmployees, useEmployeesQuery, useGetStore } from '../queries';
import { useGetHiredEmployees } from '../queries/useGetHiredEmployees';
import { uploadEmployeesToFile } from '../service/uploadEmployeesToFile';
import { useEmployeesStore } from '../state';

export const EmployeesPage = () => {
  const search = useEmployeesStore(s => s.q);
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

  const { data: store } = useGetStore(storeId);
  const { data: hiredEmployees } = useGetHiredEmployees(storeId);

  const employedStaffNumber = hiredEmployees?.employedStaff.reduce((acc, employee) => {
    return acc + employee.employees;
  }, 0);
  const employedFreelancersNumber = hiredEmployees?.employedFreelancers.length;

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

  const handleUploadFile = async () => {
    const employeesPage = await getEmployees({
      q: debouncedSearch,
      fopFilter,
      storeId,
      employerId,
      sortBy,
      sortOrder,
      page: 1,
      pageSize: 200,
    });

    uploadEmployeesToFile(employeesPage.data, storeId);
  };

  return (
    <Stack spacing={3}>
      <EmployeesFilterBar />
      <Typography flexDirection={'row'} gap={7} display={'flex'} variant="h6">
        <span>Штат:</span>
        <span>{employeesPage?.total}</span>
        <span>Кількість місць:</span>
        <span>{store?.placesAmount}</span>
        <span>Прац.штат:</span>
        <span>{employedStaffNumber}</span>
        <span>Прац.позаштат:</span>
        <span>{employedFreelancersNumber}</span>

        {employeesPage && storeId && (
          <Button variant="contained" onClick={handleUploadFile}>
            Завантажити у файл
          </Button>
        )}
      </Typography>
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
