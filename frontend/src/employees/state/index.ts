import { create } from 'zustand';
import { SortOrder } from '../../common/types';
import { EmployeesSortBy } from '../types';

type State = {
  search: string;
  fopFilter: string;
  sortBy: EmployeesSortBy;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
};

type Actions = {
  setSearch: (search: string) => void;
  setFopFilter: (fopFilter: string) => void;
  setSorting: (sortBy: State['sortBy'], sortOrder: State['sortOrder']) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

export const useEmployeesStore = create<State & Actions>(set => ({
  search: '',
  fopFilter: '',
  sortBy: 'name',
  sortOrder: 'asc',
  page: 1,
  pageSize: 50,

  setSearch: search => set(() => ({ search })),
  setFopFilter: fopFilter => set(() => ({ fopFilter })),
  setSorting: (sortBy, sortOrder) => set(() => ({ sortBy, sortOrder, page: 1 })),
  setPage: page => set(() => ({ page })),
  setPageSize: pageSize => set(() => ({ pageSize, page: 1 })),
}));
