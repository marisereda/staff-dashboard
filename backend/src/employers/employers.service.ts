import { Employer, Prisma } from '@prisma/client';
import { prisma } from '~/common/services';
import { PageData } from '~/common/types';
import { CreateEmployerBody, CreateEmployerData, EmployersQuery, UpdateEmployer } from './types';

class EmployersService {
  getAll = async ({
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

  getById = async (id: string): Promise<Employer | null> => {
    const employer = await prisma.employer.findUnique({ where: { id } });
    return employer;
  };

  create = async ({ inn, name, stores }: CreateEmployerBody): Promise<Employer | null> => {
    const connect = stores.map(id => ({ id }));
    const employer = await prisma.employer.create({
      data: { inn, name, stores: { connect } },
    });
    return employer;
  };

  update = async ({ params, body }: UpdateEmployer): Promise<Employer | null> => {
    if (!body) {
      return this.getById(params.id);
    }
    const connect = body.stores.map(id => ({ id }));
    const employer = await prisma.employer.update({
      where: {
        id: params.id,
      },
      data: {
        inn: body?.inn ?? null,
        name: body?.name,
        stores: { connect },
      },
    });
    return employer;
  };

  updateByInn = async (employers: CreateEmployerData[]): Promise<void> => {
    for (const employerData of employers) {
      await prisma.employer.upsert({
        where: { inn: employerData.inn! },
        update: employerData,
        create: employerData,
      });
    }
  };

  deleteOne = async (id: string): Promise<Employer | null> => {
    const employer = await prisma.employer.delete({ where: { id } });
    return employer;
  };
}

export const employersService = new EmployersService();
