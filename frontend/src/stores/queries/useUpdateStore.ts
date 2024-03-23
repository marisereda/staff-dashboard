import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';

import { Store } from '../types';

const updateStore = async (
  store: Pick<Store, 'code1C' | 'id' | 'address' | 'checkoutNumber'> | null
) => {
  if (!store) {
    return;
  }
  const { code1C, address, checkoutNumber } = store;
  const { data } = await api.patch<Store>(`stores/${store.id}`, {
    code1C,
    address,
    checkoutNumber,
  });
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
