import { useQuery } from '@tanstack/react-query';
import { api } from '../../common/api';
import { Employee } from '../types';

export const getEmployeeById = async (id: string) => {
  const response = await api.get<Employee>(`employees/${id}`);
  return response.data;
};

export const useGetEmployeeById = (id?: string) => {
  return useQuery({
    queryKey: ['employees', id],
    queryFn: () => getEmployeeById(id!),
    enabled: !!id,
  });
};
