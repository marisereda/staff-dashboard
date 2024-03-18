import { create } from 'zustand';
import { SortOrder } from '../../common/types';
import { Employer, EmployersSortBy } from '../types';

type State = {
  search: string;
  storeId: string;
  sortBy: EmployersSortBy;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
  isFormOpen: boolean;
  editableEmployer: Pick<Employer, 'inn' | 'name' | 'id'> | null;
};

type Actions = {
  setSearch: (search: string) => void;
  setStoreId: (storeId: string) => void;

  setSorting: (sortBy: State['sortBy'], sortOrder: State['sortOrder']) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  openForm: (editableEmployer: Pick<Employer, 'inn' | 'name' | 'id'> | null) => void;
  closeForm: () => void;
};

export const useEmployersStore = create<State & Actions>(set => ({
  search: '',
  storeId: '',
  sortBy: 'name',
  sortOrder: 'asc',
  page: 1,
  pageSize: 50,
  isFormOpen: false,
  editableEmployer: null,

  setSearch: search => set(() => ({ search })),
  setStoreId: storeId => set(() => ({ storeId })),
  setSorting: (sortBy, sortOrder) => set(() => ({ sortBy, sortOrder, page: 1 })),
  setPage: page => set(() => ({ page })),
  setPageSize: pageSize => set(() => ({ pageSize, page: 1 })),
  openForm: editableEmployer => set(() => ({ isFormOpen: true, editableEmployer })),
  closeForm: () => set(() => ({ isFormOpen: false, editableEmployer: null })),
}));
