import { useMutation } from '@tanstack/react-query';
import { api } from '../../common/api';

const uploadFopFile = async (formData: FormData) => {
  const response = await api.post<File>('update/fop', formData, { responseType: 'blob' });
  return response.data;
};

export const useSyncFopQuery = () => {
  return useMutation({
    mutationFn: uploadFopFile,
  });
};
