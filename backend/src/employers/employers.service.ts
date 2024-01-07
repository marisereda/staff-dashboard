import { Employer, Prisma } from '@prisma/client';
import { prisma } from '../lib/services';
import { PageData } from '../types';
import { EmployersQuery } from './employers.schema';

export const getAll = async ({
  q,
  storeId,
  sortBy,
  sortOrder,
  page,
  pageSize,
}: EmployersQuery): Promise<PageData<Employer[]>> => {
  const where: Prisma.EmployerWhereInput = {};
  const orderBy = { [sortBy]: sortOrder };
  const skip = pageSize * (page - 1);
  const take = pageSize;

  if (q) {
    const conditions = ['inn', 'name'].map(item => ({
      [item]: { contains: q },
    }));
    where.OR = conditions;
  }
  if (storeId) where.stores = { some: { id: storeId } };

  const data = await prisma.employer.findMany({ where, orderBy, skip, take });
  const total = await prisma.employer.count({ where });

  return { data, page, pageSize, total };
};
