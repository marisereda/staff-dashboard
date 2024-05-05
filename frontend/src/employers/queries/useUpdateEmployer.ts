import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';
import { CreateEmployerData } from '../types';

const updateEmployer = async ({ id, ...employerData }: CreateEmployerData & { id: string }) => {
  const { data } = await api.patch(`employers/${id}`, employerData);
  return data;
};

export const useUpdateEmployer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmployer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employers'] }),
  });
};
