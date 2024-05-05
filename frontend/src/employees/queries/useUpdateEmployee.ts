import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';
import { UpdateEmployeeData } from '../types';

const updateEmployee = async ({ id, ...employeeData }: UpdateEmployeeData & { id: string }) => {
  const { data } = await api.patch(`employees/${id}`, employeeData);
  return data;
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });
};
