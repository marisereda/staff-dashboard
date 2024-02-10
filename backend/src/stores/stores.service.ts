import { Prisma, Store } from '@prisma/client';
import { HrReportStore } from '~/data-parser/type/hr-report.type';
import { prisma } from '~/lib/services';
import { PageData } from '~/types';
import { StoresQuery } from './stores.schema';

class StoresService {
  getAll = async ({
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

  updateByCode1C = async (stores: HrReportStore[]): Promise<void> => {
    const promises = stores.map(store =>
      prisma.store.upsert({
        where: { code1C: store.code1C },
        update: { ...store, markDelete: false },
        create: store,
      })
    );
    await prisma.$transaction(promises);
  };
}

export const storesService = new StoresService();
