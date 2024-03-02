import { useQuery } from '@tanstack/react-query';
import { api } from '../../common/api';
import { PageData } from '../../common/types';
import { Employer } from '../types';

type SearchParams = {
  q: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  pageSize: number;
};

const getEmployers = async (params: SearchParams) => {
  const response = await api.get<PageData<Employer[]>>('employers', { params });
  return response.data;
};

export const useEmployersQuery = (params: SearchParams) => {
  return useQuery({
    queryKey: ['employers', params],
    queryFn: () => getEmployers(params),
  });
};
