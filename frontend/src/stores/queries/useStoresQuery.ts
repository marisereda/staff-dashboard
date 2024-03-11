import { useQuery } from '@tanstack/react-query';
import { api } from '../../common/api';
import { PageData } from '../../common/types';
import { Store } from '../types';

type SearchParams = {
  q: string;
  storeId?: string;
  employerId?: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  pageSize?: number;
};

const getStores = async ({ storeId, employerId, ...restSearchParams }: SearchParams) => {
  const urlSearchParams: Record<string, unknown> = { ...restSearchParams };
  if (storeId) {
    urlSearchParams.storeId = storeId;
  }
  if (employerId) {
    urlSearchParams.employerId = employerId;
  }

  const response = await api.get<PageData<Store[]>>('stores', { params: urlSearchParams });
  console.log('⚠️ response:', response.data);

  return response.data;
};

export const useStoresQuery = (params: SearchParams) => {
  return useQuery({
    queryKey: ['stores', params],
    queryFn: () => getStores(params),
  });
};
