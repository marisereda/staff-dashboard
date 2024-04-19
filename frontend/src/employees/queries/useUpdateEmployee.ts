import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';
import { Employee } from '../types';

const updateEmployee = async (employee: Partial<Employee>) => {
  const { data } = await api.patch(`employees/${employee.id}`, employee);
  return data;
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });
};
