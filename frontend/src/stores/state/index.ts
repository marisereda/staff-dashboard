import { create } from 'zustand';
import { SortOrder } from '../../common/types';
import { Store, StoresSortBy } from '../types';

type State = {
  search: string;
  storeId: string;
  employerId: string;
  sortBy: StoresSortBy;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
  isFormOpen: boolean;
  store: Pick<Store, 'address' | 'checkoutNumber' | 'id' | 'code1C'> | null;
};

type Actions = {
  setSearch: (search: string) => void;
  setStoreId: (employerId: string) => void;
  setEmployerId: (storeId: string) => void;
  setSorting: (sortBy: State['sortBy'], sortOrder: State['sortOrder']) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  openForm: (store: Pick<Store, 'address' | 'checkoutNumber' | 'id' | 'code1C'> | null) => void;
  closeForm: () => void;
};

export const useStoresStore = create<State & Actions>(set => ({
  search: '',
  storeId: '',
  employerId: '',
  sortBy: 'address',
  sortOrder: 'asc',
  page: 1,
  pageSize: 50,
  isFormOpen: false,
  store: null,

  setSearch: search => set(() => ({ search })),
  setStoreId: storeId => set(() => ({ storeId })),
  setEmployerId: employerId => set(() => ({ employerId })),
  setSorting: (sortBy, sortOrder) => set(() => ({ sortBy, sortOrder, page: 1 })),
  setPage: page => set(() => ({ page })),
  setPageSize: pageSize => set(() => ({ pageSize, page: 1 })),
  // setEditableStore: editableStore => set(() => ({ editableStore })),
  openForm: store => set(() => ({ store, isFormOpen: true })),
  closeForm: () => set(() => ({ isFormOpen: false, store: null })),
}));
