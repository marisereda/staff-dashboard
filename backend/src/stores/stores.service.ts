import { Prisma, Store } from '@prisma/client';
import { prisma } from '~/common/services';
import { PageData } from '~/common/types';
import { GetStoresQuery, UpdateStoreData } from './types';

class StoresService {
  getAll = async ({
    q,
    sortBy,
    sortOrder,
    page,
    pageSize,
  }: GetStoresQuery): Promise<PageData<Store[]>> => {
    const where: Prisma.StoreWhereInput = {};
    if (q) {
      where.address = { contains: q };
    }

    const orderBy = { [sortBy]: sortOrder };
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

  updateOne = (id: string, data: UpdateStoreData): Promise<Store> => {
    return prisma.store.update({ where: { id }, data });
  };
}

export const storesService = new StoresService();
