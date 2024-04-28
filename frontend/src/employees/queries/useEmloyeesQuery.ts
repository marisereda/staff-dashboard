import { useQuery } from '@tanstack/react-query';
import { api } from '../../common/api';
import { PageData } from '../../common/types';
import { EmployeeResponse } from '../types';

export type SearchParams = {
  q: string;
  fopFilter: string;
  storeId: string;
  employerId: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  pageSize: number;
};

const getEmployees = async ({
  fopFilter,
  storeId,
  employerId,
  ...restSearchParams
}: SearchParams) => {
  const urlSearchParams: Record<string, unknown> = { ...restSearchParams };

  if (employerId) {
    urlSearchParams.employerId = employerId;
  }

  if (storeId) {
    urlSearchParams.storeId = storeId;
  }
  if (fopFilter !== 'all') {
    urlSearchParams.isFop = fopFilter;
  }

  const response = await api.get<PageData<EmployeeResponse[]>>('employees', {
    params: urlSearchParams,
  });

  return response.data;
};

export const useEmployeesQuery = (params: SearchParams) => {
  return useQuery({
    queryKey: ['employees', params],
    queryFn: () => getEmployees(params),
  });
};
