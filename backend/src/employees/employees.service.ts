import { Employee } from '@prisma/client';
import { prisma } from '../lib/services';
import { PageData } from '../types';
import { EmployeesQuery } from './employees.schema';

export const getAll = async ({
  q,
  isFop,
  employerId,
  storeId,
  sortBy,
  sortOrder,
  page,
  pageSize,
}: EmployeesQuery): Promise<PageData<Employee[]>> => {
  let where = {};
  const orderBy = { [sortBy]: sortOrder };
  const skip = pageSize * (page - 1);
  const take = pageSize;

  if (q) {
    const conditions = ['inn', 'name', 'phone', 'position'].map(item => ({
      [item]: { contains: q },
    }));
    where = { ...where, OR: conditions };
  }
  where = { ...where, isFop, employerId, storeId };

  const data = await prisma.employee.findMany({ where, orderBy, skip, take });
  const total = await prisma.employee.count({ where });

  return { data, page, pageSize, total };
};

export const getById = async (id: string): Promise<Employee | null> => {
  const employee = await prisma.employee.findUnique({ where: { id } });
  return employee;
};
