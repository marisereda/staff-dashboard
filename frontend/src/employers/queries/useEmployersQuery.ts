import { useQuery } from '@tanstack/react-query';
import { api } from '../../common/api';
import { PageData } from '../../common/types';
import { EmployerResponse } from '../types';

type SearchParams = {
  q: string;
  employerId?: string;
  storeId?: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  pageSize?: number;
};

const getEmployers = async ({ employerId, storeId, ...restSearchParams }: SearchParams) => {
  const urlSerchParams: Record<string, unknown> = { ...restSearchParams };

  if (employerId) {
    urlSerchParams.employerId = employerId;
  }
  if (storeId) {
    urlSerchParams.storeId = storeId;
  }
  const { data } = await api.get<PageData<EmployerResponse[]>>('employers', {
    params: urlSerchParams,
  });

  return data;
};

export const useEmployersQuery = (params: SearchParams) => {
  return useQuery({
    queryKey: ['employers', params],
    queryFn: () => getEmployers(params),
  });
};
