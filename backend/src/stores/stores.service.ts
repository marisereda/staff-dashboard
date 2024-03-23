import { Prisma, Store } from '@prisma/client';
import { prisma } from '~/common/services';
import { PageData } from '~/common/types';
import { CreateStoreData, StoresQuery, UpdateStoreData } from './types';

class StoresService {
  getAll = async ({
    q,
    employerId,
    storeId,
    sortBy,
    sortOrder,
    page,
    pageSize,
  }: StoresQuery): Promise<PageData<Store[]>> => {
    const where: Prisma.StoreWhereInput = {};
    const orderBy = { [sortBy]: sortOrder };

    if (q) {
      where.address = { contains: q };
    }
    if (employerId) {
      where.employers = { some: { id: employerId } };
    }
    if (storeId) {
      where.id = { contains: storeId };
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

  markDeleteByCode1C = async (code1CList: Store['code1C'][]): Promise<void> => {
    await prisma.store.updateMany({
      where: {
        code1C: {
          notIn: code1CList,
        },
      },
      data: {
        markDelete: true,
      },
    });
  };

  updateByCode1C = async (stores: CreateStoreData[]): Promise<void> => {
    const promises = stores.map(store =>
      prisma.store.upsert({
        where: { code1C: store.code1C },
        update: { ...store, markDelete: false },
        create: store,
      })
    );
    await prisma.$transaction(promises);
  };

  updateById = async (store: UpdateStoreData): Promise<void> => {
    await prisma.store.upsert({
      where: { id: store.id },
      update: { ...store, markDelete: false },
      create: store,
    });

    // await prisma.$transaction(promise);
  };

  getByCode1C = (code1C: Store['code1C']): Promise<Store | null> => {
    return prisma.store.findUnique({ where: { code1C } });
  };
}

export const storesService = new StoresService();
