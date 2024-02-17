import { Prisma } from '@prisma/client';

export const employers: Prisma.EmployerCreateInput[] = [
  {
    name: 'FOP1',
    inn: '1',
  },
  {
    name: 'FOP2',
    inn: '2',
  },
];
