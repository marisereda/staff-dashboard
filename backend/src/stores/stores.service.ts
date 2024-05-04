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
    const orderBy = { [sortBy]: sortOrder };

    if (q) {
      where.address = { contains: q };
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
      include: { employers: true },
    });
    const total = await prisma.store.count({ where });

    return { data, page, pageSize, total };
  };

  updateOne = async (id: string, { employers, ...data }: UpdateStoreData): Promise<Store> => {
    const employersIds = employers.map(id => ({ id }));

    const [_, updatedStore] = await prisma.$transaction([
      prisma.store.update({
        where: { id },
        data: { employers: { set: [] } },
      }),
      prisma.store.update({
        where: { id },
        data: { ...data, employers: { connect: employersIds } },
      }),
    ]);

    return updatedStore;
  };
}

export const storesService = new StoresService();
