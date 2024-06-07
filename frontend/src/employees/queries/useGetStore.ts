import { useQuery } from '@tanstack/react-query';
import { api } from '../../common/api';
import { Store } from '../../stores/types';

const getStore = async (id: string): Promise<Store> => {
  const { data } = await api.get(`stores/${id}`);

  return data;
};

export const useGetStore = (id: string) => {
  return useQuery({
    queryKey: [`stores.${id}`],
    queryFn: () => getStore(id),
  });
};
