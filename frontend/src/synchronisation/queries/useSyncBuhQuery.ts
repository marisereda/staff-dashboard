import { useMutation } from '@tanstack/react-query';
import { api } from '../../common/api';

const uploadBuhFile = async (formData: FormData) => {
  await api.post<File>('update/buh', formData);
  return;
};

export const useSyncBuhQuery = () => {
  return useMutation({
    mutationFn: uploadBuhFile,
  });
};
