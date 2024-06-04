import { useQuery } from '@tanstack/react-query';
import { api } from '../../common/api';
import { PageData } from '../../common/types';
import { Employee, EmployeesSearchParams } from '../types';

export const getEmployees = async ({
  fopFilter,
  storeId,
  employerId,
  ...restSearchParams
}: EmployeesSearchParams) => {
  const urlSearchParams: Record<string, unknown> = { ...restSearchParams };

  if (fopFilter !== 'all') {
    urlSearchParams.isFop = fopFilter;
  }
  if (employerId) {
    urlSearchParams.employerId = employerId;
  }
  if (storeId) {
    urlSearchParams.storeId = storeId;
  }

  const response = await api.get<PageData<Employee[]>>('employees', {
    params: urlSearchParams,
  });

  return response.data;
};

export const useEmployeesQuery = (searchParams: EmployeesSearchParams) => {
  return useQuery({
    queryKey: ['employees', searchParams],
    queryFn: () => getEmployees(searchParams),
  });
};
