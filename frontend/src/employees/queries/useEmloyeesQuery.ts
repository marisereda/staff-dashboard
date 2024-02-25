import { useQuery } from '@tanstack/react-query';
import { api } from '../../common/api';
import { PageData } from '../../common/types';
import { Employee } from '../types';

type SearchParams = {
  q: string;
  sortBy: string;
  sortOrder: string;
};

const getEmployees = async (params: SearchParams) => {
  const response = await api.get<PageData<Employee[]>>('employees', { params });
  return response.data;
};

export const useEmployeesQuery = (params: SearchParams) => {
  return useQuery({
    queryKey: ['employees', params],
    queryFn: () => getEmployees(params),
  });
};
