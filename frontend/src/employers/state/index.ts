import { create } from 'zustand';
import { SortOrder } from '../../common/types';
import { EmployersSortBy } from '../types';

type State = {
  search: string;
  employerId: string;
  sortBy: EmployersSortBy;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
};

type Actions = {
  setSearch: (search: string) => void;
  setEmployerId: (employerId: string) => void;

  setSorting: (sortBy: State['sortBy'], sortOrder: State['sortOrder']) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

export const useEmployersStore = create<State & Actions>(set => ({
  search: '',
  employerId: '',
  sortBy: 'name',
  sortOrder: 'asc',
  page: 1,
  pageSize: 50,

  setSearch: search => set(() => ({ search })),
  setEmployerId: employerId => set(() => ({ employerId })),
  setSorting: (sortBy, sortOrder) => set(() => ({ sortBy, sortOrder, page: 1 })),
  setPage: page => set(() => ({ page })),
  setPageSize: pageSize => set(() => ({ pageSize, page: 1 })),
}));
