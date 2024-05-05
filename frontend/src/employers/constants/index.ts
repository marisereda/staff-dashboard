import { HeadColumnOptions } from '../../common/components/TableHead';
import { EmployersSearchParams } from '../types';

export const EMPLOYERS_HEAD_COLUMNS: HeadColumnOptions<EmployersSearchParams['sortBy']>[] = [
  {
    primaryLabel: 'ДРФО',
    secondaryLabel: 'оподаткування',
    sortBy: 'inn',
  },
  {
    primaryLabel: 'ПІБ',
    secondaryLabel: null,
    sortBy: 'name',
  },
] as const;
