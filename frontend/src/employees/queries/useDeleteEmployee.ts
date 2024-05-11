import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';

const deleteEmployee = async (id: string) => {
  const { data } = await api.delete(`employees/${id}`);
  return data;
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });
};
