import { create } from 'zustand';

type State = {
  employeeId: string | null;
  isDialogConfirmOpen: boolean;
};
type Actions = {
  setEmployeeId: (employeeId: string | null) => void;
  setIsDialogConfirmOpen: (isDialogConfirmOpen: boolean) => void;
};

export const useNoteStore = create<State & Actions>(set => ({
  employeeId: null,
  isDialogConfirmOpen: false,
  setEmployeeId: employeeId => set(() => ({ employeeId })),
  setIsDialogConfirmOpen: isDialogConfirmOpen => set(() => ({ isDialogConfirmOpen })),
}));
