import { useMutation } from '@tanstack/react-query';
import { api } from '../../common/api';

const uploadBuhFile = async (formData: FormData) => {
  const response = await api.post<File>('update/buh', formData);
  console.log('⚠️ response:', response);
  return;
};

export const useSyncBuhQuery = () => {
  return useMutation({
    mutationFn: uploadBuhFile,
  });
};
