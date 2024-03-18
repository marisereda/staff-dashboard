import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';
import { Employer } from '../types';

const updateEmployer = async (employer: Pick<Employer, 'inn' | 'name' | 'id'>) => {
  const { data } = await api.patch(`employers/${employer.id}`, employer);
  return data;
};

export const useUpdateEmployer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmployer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employers'] }),
  });
};
