import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';

import { Store, UpdateStoreData } from '../types';

const updateStore = async ({ id, ...storeData }: UpdateStoreData & { id: string }) => {
  const { data } = await api.patch<Store>(`stores/${id}`, storeData);
  return data;
};

export const useUpdateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
  });
};
