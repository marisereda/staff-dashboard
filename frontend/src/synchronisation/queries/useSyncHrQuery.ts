import { useMutation } from '@tanstack/react-query';
import { api } from '../../common/api';

// const uploadBuhFile = async () => {};

const uploadHrFile = async (formData: FormData) => {
  const response = await api.post<File>('update/hr', formData);
  console.log('⚠️ response:', response);
  return;
};

export const useSyncHrQuery = () => {
  return useMutation({
    mutationFn: uploadHrFile,
  });
};
