import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../common/api';

const deleteBuhWorkplace = async ({
  employeeId,
  workplaceId,
}: {
  employeeId: string;
  workplaceId: string;
}) => {
  await api.delete(`employees/${employeeId}/workplace/${workplaceId}`);
};

export const useDeleteBuhWorkplace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBuhWorkplace,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });
};
