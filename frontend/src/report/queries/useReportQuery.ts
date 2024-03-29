import { useMutation } from '@tanstack/react-query';
import { api } from '../../common/api';

const createReport = async () => {
  await api.get<void>('report');
};

export const useReportQuery = () => {
  return useMutation({
    mutationFn: createReport,
  });
};
