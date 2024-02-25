import { create } from 'zustand';
import { SortBy } from '../../common/types';
import { EmployeesSortBy } from '../types';

type State = {
  search: string;
  sortBy: EmployeesSortBy;
  sortOrder: SortBy;
  page: number;
  pageSize: number;
};

type Actions = {
  setSearch: (search: string) => void;
  setSorting: (sortBy: State['sortBy'], sortOrder: State['sortOrder']) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

export const useEmployeesStore = create<State & Actions>(set => ({
  search: '',
  sortBy: 'name',
  sortOrder: 'asc',
  page: 1,
  pageSize: 50,

  setSearch: search => set(() => ({ search })),
  setSorting: (sortBy, sortOrder) => set(() => ({ sortBy, sortOrder, page: 1 })),
  setPage: page => set(() => ({ page })),
  setPageSize: pageSize => set(() => ({ pageSize, page: 1 })),
}));
