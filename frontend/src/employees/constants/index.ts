import { HeadColumnOptions } from '../../common/components/TableHead';
import { EmployeesSortBy } from '../types';

export const EMPLOYEES_HEAD_COLUMNS: HeadColumnOptions<EmployeesSortBy>[] = [
  {
    primaryLabel: 'ФОП',
    secondaryLabel: null,
    sortBy: 'isFop',
  },
  {
    primaryLabel: 'ДРФО',
    secondaryLabel: null,
    sortBy: 'inn',
  },
  {
    primaryLabel: 'ПІБ',
    secondaryLabel: 'Код 1С',
    sortBy: 'name',
  },
  {
    primaryLabel: 'Посада HR',
    secondaryLabel: 'Посада бух.',
    sortBy: null,
  },
  {
    primaryLabel: 'Роботодавець',
    secondaryLabel: null,
    sortBy: null,
  },
  {
    primaryLabel: 'Магазин',
    secondaryLabel: 'Магазин бух.',
    sortBy: 'storeAddress',
  },
  {
    primaryLabel: 'Телефон',
    secondaryLabel: null,
    sortBy: 'phone',
  },
  {
    primaryLabel: '',
    secondaryLabel: null,
    sortBy: null,
  },
] as const;
