import { create } from 'zustand';
import { Employer, EmployersSearchParams } from '../types';

type State = EmployersSearchParams & {
  isFormOpen: boolean;
  editingEmployer: Employer | null;
};

type Actions = {
  setSearch: (q: string) => void;
  setSorting: (sortBy: State['sortBy'], sortOrder: State['sortOrder']) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  openForm: (editingEmployer: Employer | null) => void;
  closeForm: () => void;
};

export const useEmployersStore = create<State & Actions>(set => ({
  q: '',
  sortBy: 'name',
  sortOrder: 'asc',
  page: 1,
  pageSize: 50,
  isFormOpen: false,
  editingEmployer: null,

  setSearch: q => set(() => ({ q })),
  setSorting: (sortBy, sortOrder) => set(() => ({ sortBy, sortOrder, page: 1 })),
  setPage: page => set(() => ({ page })),
  setPageSize: pageSize => set(() => ({ pageSize, page: 1 })),
  openForm: editingEmployer => set(() => ({ isFormOpen: true, editingEmployer })),
  closeForm: () => set(() => ({ isFormOpen: false, editingEmployer: null })),
}));
