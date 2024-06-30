import { create } from 'zustand';
import { Employee, EmployeesSearchParams } from '../types';

type State = EmployeesSearchParams & {
  isFormOpen: boolean;
  editingEmployee: Employee | null;
  deletingEmployee: Employee | null;
};

type Actions = {
  setSearch: (q: string) => void;
  setFopFilter: (fopFilter: State['fopFilter']) => void;
  setStatusFilter: (markAsDeletedFilter: State['statusFilter']) => void;
  setNoteFilter: (noteFilter: State['noteFilter']) => void;
  setStoreId: (employerId: string) => void;
  setEmployerId: (storeId: string) => void;
  setDeletingEmployee: (deletingEmployee: Employee | null) => void;
  setSorting: (sortBy: State['sortBy'], sortOrder: State['sortOrder']) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  openForm: (editingEmployee: Employee | null) => void;
  closeForm: () => void;
};

export const useEmployeesStore = create<State & Actions>(set => ({
  q: '',
  fopFilter: 'all',
  statusFilter: 'all',
  noteFilter: 'all',
  storeId: '',
  employerId: '',
  sortBy: 'name',
  sortOrder: 'asc',
  page: 1,
  pageSize: 50,
  isFormOpen: false,
  editingEmployee: null,
  deletingEmployee: null,

  setSearch: q => set(() => ({ q })),
  setFopFilter: fopFilter => set(() => ({ fopFilter })),
  setStatusFilter: statusFilter => set(() => ({ statusFilter })),
  setNoteFilter: noteFilter => set(() => ({ noteFilter })),
  setStoreId: storeId => set(() => ({ storeId })),
  setEmployerId: employerId => set(() => ({ employerId })),
  setDeletingEmployee: deletingEmployee => set(() => ({ deletingEmployee })),
  setSorting: (sortBy, sortOrder) => set(() => ({ sortBy, sortOrder, page: 1 })),
  setPage: page => set(() => ({ page })),
  setPageSize: pageSize => set(() => ({ pageSize, page: 1 })),
  openForm: editingEmployee => set(() => ({ isFormOpen: true, editingEmployee })),
  closeForm: () => set(() => ({ isFormOpen: false, editingEmployee: null })),
}));
