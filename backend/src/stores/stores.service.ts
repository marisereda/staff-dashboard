import { Prisma, Store } from '@prisma/client';
import { prisma } from '~/lib/services';
import { PageData } from '~/types';
import { StoresQuery } from './stores.schema';

export const getAll = async ({
  q,
  employerId,
  sortBy,
  sortOrder,
  page,
  pageSize,
}: StoresQuery): Promise<PageData<Store[]>> => {
  const where: Prisma.StoreWhereInput = {};
  const orderBy = { [sortBy]: sortOrder };
  const skip = pageSize * (page - 1);
  const take = pageSize;

  if (q) where.address = { contains: q };
  if (employerId) where.employers = { some: { id: employerId } };

  const data = await prisma.store.findMany({ where, orderBy, skip, take });
  const total = await prisma.store.count({ where });

  return { data, page, pageSize, total };
};
