import { HeadColumnOptions } from '../../common/components/TableHead';
import { EmployeesSearchParams } from '../types';

export const EMPLOYEES_HEAD_COLUMNS: HeadColumnOptions<EmployeesSearchParams['sortBy']>[] = [
  {
    primaryLabel: 'ФОП',
    secondaryLabel: null,
    sortBy: 'isFop',
  },
  {
    primaryLabel: 'ДРФО',
    secondaryLabel: 'Код 1С',
    sortBy: 'inn',
  },
  {
    primaryLabel: 'ПІБ',
    secondaryLabel: 'Телефон',
    sortBy: 'name',
  },
  {
    primaryLabel: 'Посади',
    secondaryLabel: null,
    sortBy: null,
  },
  {
    primaryLabel: '',
    secondaryLabel: null,
    sortBy: null,
  },
] as const;
