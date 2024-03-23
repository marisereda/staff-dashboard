import { useMutation } from '@tanstack/react-query';
import { api } from '../../common/api';

const uploadHrFile = async (formData: FormData) => {
  await api.post<File>('update/hr', formData);
  return;
};

export const useSyncHrQuery = () => {
  return useMutation({
    mutationFn: uploadHrFile,
  });
};
