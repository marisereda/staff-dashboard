import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';
// import { Employer } from '../types';

const deleteEmployer = async (id: string) => {
  const { data } = await api.delete(`employers/${id}`);
  return data;
};

export const useDeleteEmployer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employers'] }),
  });
};
