import { create } from 'zustand';
import { Employee, EmployeesSearchParams } from '../types';

type State = EmployeesSearchParams & {
  isFormOpen: boolean;
  editingEmployee: Employee | null;
};

type Actions = {
  setSearch: (q: string) => void;
  setFopFilter: (fopFilter: State['fopFilter']) => void;
  setStoreId: (employerId: string) => void;
  setEmployerId: (storeId: string) => void;
  setSorting: (sortBy: State['sortBy'], sortOrder: State['sortOrder']) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  openForm: (editingEmployee: Employee | null) => void;
  closeForm: () => void;
};

export const useEmployeesStore = create<State & Actions>(set => ({
  q: '',
  fopFilter: 'all',
  storeId: '',
  employerId: '',
  sortBy: 'name',
  sortOrder: 'asc',
  page: 1,
  pageSize: 50,
  isFormOpen: false,
  editingEmployee: null,

  setSearch: q => set(() => ({ q })),
  setFopFilter: fopFilter => set(() => ({ fopFilter })),
  setStoreId: storeId => set(() => ({ storeId })),
  setEmployerId: employerId => set(() => ({ employerId })),
  setSorting: (sortBy, sortOrder) => set(() => ({ sortBy, sortOrder, page: 1 })),
  setPage: page => set(() => ({ page })),
  setPageSize: pageSize => set(() => ({ pageSize, page: 1 })),
  openForm: editingEmployee => set(() => ({ isFormOpen: true, editingEmployee })),
  closeForm: () => set(() => ({ isFormOpen: false, editingEmployee: null })),
}));
