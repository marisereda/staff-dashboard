import { useQuery } from '@tanstack/react-query';
import { api } from '../../common/api';
import { PageData } from '../../common/types';
import { Employer, EmployersSearchParams } from '../types';

const getEmployers = async (searchParams: EmployersSearchParams) => {
  const { data } = await api.get<PageData<Employer[]>>('employers', {
    params: searchParams,
  });
  return data;
};

export const useEmployersQuery = (searchParams: EmployersSearchParams) => {
  return useQuery({
    queryKey: ['employers', searchParams],
    queryFn: () => getEmployers(searchParams),
  });
};
