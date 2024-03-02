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
    sortBy: null,
  },
  {
    primaryLabel: 'ПІБ',
    secondaryLabel: 'Код 1С',
    sortBy: 'name',
  },
  {
    primaryLabel: 'Посада HR',
    secondaryLabel: 'Посада бух.',
    sortBy: 'position',
  },
  {
    primaryLabel: 'Роботодавець',
    secondaryLabel: null,
    sortBy: null,
  },
  {
    primaryLabel: 'Магазин',
    secondaryLabel: 'Магазин бух.',
    sortBy: null,
  },
  {
    primaryLabel: 'Телефон',
    secondaryLabel: null,
    sortBy: null,
  },
  {
    primaryLabel: null,
    secondaryLabel: null,
    sortBy: null,
  },
] as const;
