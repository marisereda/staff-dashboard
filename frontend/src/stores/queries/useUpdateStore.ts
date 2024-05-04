import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';

import { Store } from '../types';

const updateStore = async (
  store: Pick<Store, 'id' | 'checkoutNumber' | 'placesAmount' | 'employers' | 'address'> | null
) => {
  if (!store) {
    return;
  }
  const { address, checkoutNumber, placesAmount, employers } = store;
  const { data } = await api.patch<Store>(`stores/${store.id}`, {
    address,
    checkoutNumber,
    placesAmount,
    employers,
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
