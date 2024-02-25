import { create } from 'zustand';
import { SortBy } from '../../common/types';
import { EmployeesSortBy } from '../types';

type State = {
  search: string;
  sortBy: EmployeesSortBy;
  sortOrder: SortBy;
};

type Actions = {
  setSearch: (search: string) => void;
  setSorting: (sortBy: State['sortBy'], sortOrder: State['sortOrder']) => void;
};

export const useEmployeesStore = create<State & Actions>(set => ({
  search: '',
  sortBy: 'name',
  sortOrder: 'asc',

  setSearch: search => set(() => ({ search })),
  setSorting: (sortBy, sortOrder) => set(() => ({ sortBy, sortOrder })),
}));
