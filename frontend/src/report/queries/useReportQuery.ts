import { useMutation } from '@tanstack/react-query';
import { api } from '../../common/api';

const createReport = async () => {
  const response = await api.get<Blob>('report', { responseType: 'blob' });

  return response.data;
};

export const useReportQuery = () => {
  return useMutation({
    mutationFn: createReport,
  });
};
