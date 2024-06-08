import { Employer, Prisma } from '@prisma/client';
import { prisma } from '~/common/services';
import { PageData } from '~/common/types';
import { GetEmployersQuery } from './types';

class EmployersService {
  getAll = async ({
    q = '',
    storeId,
    sortBy = 'name',
    sortOrder = 'asc',
    page = 1,
    pageSize,
  }: GetEmployersQuery): Promise<PageData<Employer[]>> => {
    const where: Prisma.EmployerWhereInput = {};
    const orderBy = { [sortBy]: sortOrder };

    if (q) {
      const conditions = ['inn', 'name'].map(item => ({
        [item]: { contains: q },
      }));
      where.OR = conditions;
    }

    if (storeId) {
      where.workplacesBuh = { some: { storeId } };
    }

    const pageParams = pageSize
      ? {
          skip: pageSize * (page - 1),
          take: pageSize,
        }
      : undefined;

    const data = await prisma.employer.findMany({
      where,
      orderBy,
      ...pageParams,
    });
    const total = await prisma.employer.count({ where });

    return { data, page, pageSize, total };
  };

  getOne = (id: string): Promise<Employer> => {
    return prisma.employer.findUniqueOrThrow({ where: { id } });
  };

  create = (data: Prisma.EmployerCreateInput): Promise<Employer> => {
    return prisma.employer.create({ data });
  };

  updateOne = (id: string, data: Prisma.EmployerUpdateInput): Promise<Employer> => {
    return prisma.employer.update({ where: { id }, data });
  };

  deleteOne = (id: string): Promise<Employer> => {
    return prisma.employer.delete({ where: { id } });
  };
}

export const employersService = new EmployersService();
