import { create } from 'zustand';
import { Store, StoresSearchParams } from '../types';

type State = StoresSearchParams & {
  isFormOpen: boolean;
  editingStore: Store | null;
};

type Actions = {
  setSearch: (q: string) => void;
  setSorting: (sortBy: State['sortBy'], sortOrder: State['sortOrder']) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setEmployerId: (employerId: string) => void;
  openForm: (editingStore: Store | null) => void;
  closeForm: () => void;
};

export const useStoresStore = create<State & Actions>(set => ({
  q: '',
  sortBy: 'addressHr',
  sortOrder: 'asc',
  page: 1,
  pageSize: 50,
  employerId: '',
  isFormOpen: false,
  editingStore: null,

  setSearch: q => set(() => ({ q })),
  setSorting: (sortBy, sortOrder) => set(() => ({ sortBy, sortOrder, page: 1 })),
  setPage: page => set(() => ({ page })),
  setPageSize: pageSize => set(() => ({ pageSize, page: 1 })),
  setEmployerId: employerId => set(() => ({ employerId })),
  openForm: editingStore => set(() => ({ isFormOpen: true, editingStore })),
  closeForm: () => set(() => ({ isFormOpen: false, editingStore: null })),
}));
