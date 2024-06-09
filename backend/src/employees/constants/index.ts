import { Prisma } from '@prisma/client';
import { UpdateStatus } from '~/common/enums';

export const STATUS_FILTER_KEYS = [
  'all',
  'hrDeleted',
  'buhDeleted',
  'allDeleted',
  'notDeleted',
] as const;

export type StatusFilter = (typeof STATUS_FILTER_KEYS)[number];

export const STATUS_FILTER_MAP: Record<StatusFilter, Prisma.EmployeeWhereInput> = {
  all: {},
  hrDeleted: { updateStatusHr: UpdateStatus.DELETE },
  buhDeleted: { updateStatusBuh: UpdateStatus.DELETE },
  allDeleted: {
    OR: [{ updateStatusHr: UpdateStatus.DELETE }, { updateStatusBuh: UpdateStatus.DELETE }],
  },
  notDeleted: {
    AND: [
      { OR: [{ updateStatusHr: { not: UpdateStatus.DELETE } }, { updateStatusHr: null }] },
      { OR: [{ updateStatusBuh: { not: UpdateStatus.DELETE } }, { updateStatusBuh: null }] },
    ],
  },
};
