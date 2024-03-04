import { useQuery } from '@tanstack/react-query';
import { api } from '../../common/api';
import { PageData } from '../../common/types';
import { Employee } from '../types';

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
  const urlSerchParams: Record<string, unknown> = { ...restSearchParams };

  if (employerId) {
    urlSerchParams.employerId = employerId;
  }

  if (storeId) {
    urlSerchParams.storeId = storeId;
  }
  if (fopFilter !== 'all') {
    urlSerchParams.isFop = fopFilter;
  }

  const response = await api.get<PageData<Employee[]>>('employees', { params: urlSerchParams });
  return response.data;
};

export const useEmployeesQuery = (params: SearchParams) => {
  return useQuery({
    queryKey: ['employees', params],
    queryFn: () => getEmployees(params),
  });
};
