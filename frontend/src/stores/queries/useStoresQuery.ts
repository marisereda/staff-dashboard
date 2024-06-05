import { useQuery } from '@tanstack/react-query';
import { api } from '../../common/api';
import { PageData } from '../../common/types';
import { Store, StoresSearchParams } from '../types';

const getStores = async (searchParams: StoresSearchParams) => {
  const { data } = await api.get<PageData<Store[]>>('stores', { params: searchParams });

  return data;
};

export const useStoresQuery = (searchParams: StoresSearchParams) => {
  return useQuery({
    queryKey: ['stores', searchParams],
    queryFn: () => getStores(searchParams),
  });
};
