import { HeadColumnOptions } from '../../common/components/TableHead';
import { EmployersSortBy } from '../types';

export const EMPLOYERS_HEAD_COLUMNS: HeadColumnOptions<EmployersSortBy>[] = [
  {
    primaryLabel: 'ДРФО',
    secondaryLabel: null,
    sortBy: 'inn',
  },
  {
    primaryLabel: 'ПІБ',
    secondaryLabel: null,
    sortBy: 'name',
  },
  {
    primaryLabel: 'Магазини',
    secondaryLabel: null,
    sortBy: null,
  },
] as const;
