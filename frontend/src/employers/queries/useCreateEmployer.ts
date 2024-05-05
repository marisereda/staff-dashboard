import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';
import { CreateEmployerData } from '../types';

const createEmployer = async (employer: CreateEmployerData) => {
  const { data } = await api.post('employers', employer);
  return data;
};

export const useCreateEmployer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEmployer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employers'] }),
  });
};
