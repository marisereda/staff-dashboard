import { HeadColumnOptions } from '../../common/components/TableHead';
import { StoresSearchParams } from '../types';

export const STORES_HEAD_COLUMNS: HeadColumnOptions<StoresSearchParams['sortBy']>[] = [
  {
    primaryLabel: 'Код 1С',
    secondaryLabel: null,
    sortBy: null,
  },
  {
    primaryLabel: 'Адреса',
    secondaryLabel: 'Адреса (бух.)',
    sortBy: 'addressHr',
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
] as const;
