import { create } from 'zustand';
import { SortOrder } from '../../common/types';
import { Employee, EmployeesSortBy } from '../types';

type State = {
  search: string;
  fopFilter: string;
  storeId: string;
  employerId: string;
  sortBy: EmployeesSortBy;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
  isFormOpen: boolean;
  editableEmployee: Pick<Employee, 'inn' | 'name' | 'id' | 'isFop'> | null;
};

type Actions = {
  setSearch: (search: string) => void;
  setFopFilter: (fopFilter: string) => void;
  setStoreId: (employerId: string) => void;
  setEmployerId: (storeId: string) => void;
  setSorting: (sortBy: State['sortBy'], sortOrder: State['sortOrder']) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  openForm: (editableEmployee: Pick<Employee, 'inn' | 'name' | 'id' | 'isFop'> | null) => void;
  closeForm: () => void;
};

export const useEmployeesStore = create<State & Actions>(set => ({
  search: '',
  fopFilter: 'all',
  storeId: '',
  employerId: '',
  sortBy: 'name',
  sortOrder: 'asc',
  page: 1,
  pageSize: 50,
  isFormOpen: false,
  editableEmployee: null,

  setSearch: search => set(() => ({ search })),
  setFopFilter: fopFilter => set(() => ({ fopFilter })),
  setStoreId: storeId => set(() => ({ storeId })),
  setEmployerId: employerId => set(() => ({ employerId })),
  setSorting: (sortBy, sortOrder) => set(() => ({ sortBy, sortOrder, page: 1 })),
  setPage: page => set(() => ({ page })),
  setPageSize: pageSize => set(() => ({ pageSize, page: 1 })),
  openForm: editableEmployee => set(() => ({ isFormOpen: true, editableEmployee })),
  closeForm: () => set(() => ({ isFormOpen: false, editableEmployee: null })),
}));
