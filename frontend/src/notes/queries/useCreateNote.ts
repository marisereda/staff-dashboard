import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';

export type CreateNoteData = {
  ownerId: string;
  content: string;
  isImportant: boolean;
  isDone: boolean;
};

const createNote = async (noteData: CreateNoteData) => {
  const { data } = await api.post(`notes`, noteData);
  return data;
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });
};
