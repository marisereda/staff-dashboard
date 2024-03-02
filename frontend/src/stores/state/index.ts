import { create } from 'zustand';
import { SortOrder } from '../../common/types';
import { StoresSortBy } from '../types';

type State = {
  search: string;
  sortBy: StoresSortBy;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
};

type Actions = {
  setSearch: (search: string) => void;
  setSorting: (sortBy: State['sortBy'], sortOrder: State['sortOrder']) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

export const useStoresStore = create<State & Actions>(set => ({
  search: '',
  sortBy: 'address',
  sortOrder: 'asc',
  page: 1,
  pageSize: 50,

  setSearch: search => set(() => ({ search })),
  setSorting: (sortBy, sortOrder) => set(() => ({ sortBy, sortOrder, page: 1 })),
  setPage: page => set(() => ({ page })),
  setPageSize: pageSize => set(() => ({ pageSize, page: 1 })),
}));
