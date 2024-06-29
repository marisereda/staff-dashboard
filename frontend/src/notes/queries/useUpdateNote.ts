import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';

export type UpdateNoteData = {
  id: string;
  ownerId: string;
  content: string;
  isImportant: boolean;
  isDone: boolean;
};

const updateNote = async ({ id, ...noteData }: UpdateNoteData) => {
  const { data } = await api.patch(`notes/${id}`, noteData);
  return data;
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });
};
