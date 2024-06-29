import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';

const deleteNote = async (id: string) => {
  const { data } = await api.delete(`notes/${id}`);
  console.log('🚧 dataDelete:', data);

  return data;
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });
};
