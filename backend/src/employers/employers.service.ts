import { Employer, Prisma } from '@prisma/client';
import { prisma } from '~/lib/services';
import { PageData } from '~/types';
import { CreateEmployerBody, EmployersQuery, UpdateEmployer } from './employers.schema';

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

export const getById = async (id: string): Promise<Employer | null> => {
  const employer = await prisma.employer.findUnique({ where: { id } });
  return employer;
};

export const create = async ({
  inn,
  name,
  stores,
}: CreateEmployerBody): Promise<Employer | null> => {
  const connect = stores.map(id => ({ id }));
  const employer = await prisma.employer.create({
    data: { inn: inn ?? null, name, stores: { connect } },
  });
  return employer;
};

export const update = async ({ params, body }: UpdateEmployer): Promise<Employer | null> => {
  if (!body) {
    return getById(params.id);
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

export const deleteOne = async (id: string): Promise<Employer | null> => {
  const employer = await prisma.employer.delete({ where: { id } });
  return employer;
};

// const deleteUser = await prisma.user.delete({
//   where: {
//     email: 'bert@prisma.io',
//   },
// })
