import { useQuery } from '@tanstack/react-query';
import { api } from '../../common/api';
import { PageData } from '../../common/types';
import { Employer } from '../types';

type SearchParams = {
  q: string;
  employerId?: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  pageSize?: number;
};

const getEmployers = async ({ employerId, ...restSearchParams }: SearchParams) => {
  const urlSerchParams: Record<string, unknown> = { ...restSearchParams };

  if (employerId) {
    urlSerchParams.employerId = employerId;
  }
  const response = await api.get<PageData<Employer[]>>('employers', { params: urlSerchParams });
  return response.data;
};

export const useEmployersQuery = (params: SearchParams) => {
  return useQuery({
    queryKey: ['employers', params],
    queryFn: () => getEmployers(params),
  });
};
