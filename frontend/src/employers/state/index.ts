import { create } from 'zustand';
import { SortOrder } from '../../common/types';
import { EmployersSortBy } from '../types';

type State = {
  search: string;
  storeId: string;
  sortBy: EmployersSortBy;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
  isFormOpen: boolean;
};

type Actions = {
  setSearch: (search: string) => void;
  setStoreId: (storeId: string) => void;

  setSorting: (sortBy: State['sortBy'], sortOrder: State['sortOrder']) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setIsFormOpen: (isFormOpen: boolean) => void;
};

export const useEmployersStore = create<State & Actions>(set => ({
  search: '',
  storeId: '',
  sortBy: 'name',
  sortOrder: 'asc',
  page: 1,
  pageSize: 50,
  isFormOpen: false,

  setSearch: search => set(() => ({ search })),
  setStoreId: storeId => set(() => ({ storeId })),
  setSorting: (sortBy, sortOrder) => set(() => ({ sortBy, sortOrder, page: 1 })),
  setPage: page => set(() => ({ page })),
  setPageSize: pageSize => set(() => ({ pageSize, page: 1 })),
  setIsFormOpen: isFormOpen => set(() => ({ isFormOpen })),
}));
