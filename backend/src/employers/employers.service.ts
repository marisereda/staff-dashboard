import { Employer, Prisma } from '@prisma/client';
import { prisma } from '~/common/services';
import { PageData } from '~/common/types';
import { CreateEmployerBody, EmployersQuery, UpdateEmployerBody } from './types';

class EmployersService {
  getAll = async ({
    q,
    storeId,
    employerId,
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
    if (employerId) where.id = { contains: employerId };
    const data = await prisma.employer.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { stores: true },
    });
    const total = await prisma.employer.count({ where });

    return { data, page, pageSize, total };
  };

  getById = async (id: string): Promise<Employer | null> => {
    const employer = await prisma.employer.findUnique({ where: { id } });
    return employer;
  };

  getByInn = async (inn: string): Promise<Employer | null> => {
    const employer = await prisma.employer.findUnique({ where: { inn } });
    return employer;
  };

  create = async ({ inn, name, stores }: CreateEmployerBody): Promise<Employer | null> => {
    const connect = stores.map(id => ({ id }));
    const employer = await prisma.employer.create({
      data: { inn, name, stores: { connect } },
    });
    return employer;
  };

  update = async (
    id: string,
    { stores, ...restData }: Partial<UpdateEmployerBody>
  ): Promise<Employer | null> => {
    const connectStores = stores?.map(id => ({ id })) ?? [];
    const employer = await prisma.employer.update({
      where: {
        id,
      },
      data: {
        ...restData,
        stores: { connect: connectStores },
      },
    });
    return employer;
  };

  deleteOne = async (id: string): Promise<Employer | null> => {
    const employer = await prisma.employer.delete({ where: { id } });
    return employer;
  };
}

export const employersService = new EmployersService();
