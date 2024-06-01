import { useQuery } from '@tanstack/react-query';
import { api } from '../../common/api';
import { HiredEmployees } from '../types';

const getHiredEmployees = async (storeId: string): Promise<HiredEmployees> => {
  const { data } = await api.get(`report/store/${storeId}/employees`);
  return data;
};

export const useGetHiredEmployees = (storeId: string) => {
  return useQuery({
    queryKey: [`HiredEmployees.${storeId}`],
    queryFn: () => getHiredEmployees(storeId),
    enabled: !!storeId,
  });
};
