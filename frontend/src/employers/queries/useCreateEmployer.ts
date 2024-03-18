import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';
import { Employer } from '../types';

const createEmployer = async (employer: Pick<Employer, 'inn' | 'name'>) => {
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
