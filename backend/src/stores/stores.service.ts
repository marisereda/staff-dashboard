import { Prisma, Store } from '@prisma/client';
import { prisma } from '~/common/services';
import { PageData } from '~/common/types';
import { GetStoresQuery } from './types';

class StoresService {
  getAll = async ({
    q,
    employerId,
    sortBy,
    sortOrder,
    page,
    pageSize,
  }: GetStoresQuery): Promise<PageData<Store[]>> => {
    const where: Prisma.StoreWhereInput = {};
    const orderBy = { [sortBy]: sortOrder };

    if (q) {
      const conditions = ['code1C', 'addressHr', 'addressBuh'].map(item => ({
        [item]: { contains: q },
      }));
      where.OR = conditions;
    }
    if (employerId) {
      where.workplacesBuh = { some: { employerId } };
    }

    const pagination = pageSize
      ? {
          skip: pageSize * (page - 1),
          take: pageSize,
        }
      : null;

    const data = await prisma.store.findMany({
      where,
      orderBy,
      ...pagination,
    });
    const total = await prisma.store.count({ where });

    return { data, page, pageSize, total };
  };

  getOne = (id: string): Promise<Store> => {
    return prisma.store.findUniqueOrThrow({ where: { id } });
  };

  updateOne = async (id: string, data: Prisma.StoreUpdateInput): Promise<Store> => {
    return prisma.store.update({ where: { id }, data });
  };
}

export const storesService = new StoresService();
