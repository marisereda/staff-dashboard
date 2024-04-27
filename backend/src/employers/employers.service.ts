import { Employer, Prisma } from '@prisma/client';
import { prisma } from '~/common/services';
import { PageData } from '~/common/types';
import { CreateEmployerData, GetEmployersQuery, UpdateEmployerData } from './types';

class EmployersService {
  getAll = async ({
    q = '',
    sortBy = 'name',
    sortOrder = 'asc',
    page = 1,
    pageSize,
  }: GetEmployersQuery): Promise<PageData<Employer[]>> => {
    const where: Prisma.EmployerWhereInput = {};
    if (q) {
      const conditions = ['inn', 'name'].map(item => ({
        [item]: { contains: q },
      }));
      where.OR = conditions;
    }

    const orderBy = { [sortBy]: sortOrder };
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

  getById = (id: string): Promise<Employer | null> => {
    return prisma.employer.findUniqueOrThrow({ where: { id } });
  };

  create = (data: CreateEmployerData): Promise<Employer | null> => {
    return prisma.employer.create({ data });
  };

  update = (id: string, data: Partial<UpdateEmployerData>): Promise<Employer | null> => {
    return prisma.employer.update({ where: { id }, data });
  };

  deleteOne = (id: string): Promise<Employer | null> => {
    return prisma.employer.delete({ where: { id } });
  };
}

export const employersService = new EmployersService();
