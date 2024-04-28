import { HeadColumnOptions } from '../../common/components/TableHead';
import { StoresSortBy } from '../types';

export const STORES_HEAD_COLUMNS: HeadColumnOptions<StoresSortBy>[] = [
  {
    primaryLabel: 'Код 1С',
    secondaryLabel: null,
    sortBy: null,
  },
  {
    primaryLabel: 'Адреса',
    secondaryLabel: null,
    sortBy: 'address',
  },
  {
    primaryLabel: 'Кіл-ть кас',
    secondaryLabel: null,
    sortBy: 'checkoutNumber',
  },
  {
    primaryLabel: 'Кіл-ть місць для працевлаштування',
    secondaryLabel: null,
    sortBy: null,
  },

  {
    primaryLabel: 'Роботодавець',
    secondaryLabel: null,
    sortBy: null,
  },
] as const;
