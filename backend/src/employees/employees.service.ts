import { Employee, Prisma } from '@prisma/client';
import { prisma } from '~/lib/services';
import { PageData } from '~/types';
import { EmployeesQuery } from './employees.schema';

class EmployeesService {
  getAll = async ({
    q,
    isFop,
    employerId,
    storeId,
    sortBy,
    sortOrder,
    page,
    pageSize,
  }: EmployeesQuery): Promise<PageData<Employee[]>> => {
    const where: Prisma.EmployeeWhereInput = {};
    const orderBy = { [sortBy]: sortOrder };
    const skip = pageSize * (page - 1);
    const take = pageSize;

    if (q) {
      const conditions = ['inn', 'name', 'phone', 'position'].map(item => ({
        [item]: { contains: q },
      }));
      where.OR = conditions;
    }
    if (isFop !== undefined) where.isFop = isFop;
    if (employerId) where.employerId = employerId;
    if (storeId) where.storeId = storeId;

    const data = await prisma.employee.findMany({ where, orderBy, skip, take });
    const total = await prisma.employee.count({ where });

    return { data, page, pageSize, total };
  };

  getById = async (id: string): Promise<Employee | null> => {
    const employee = await prisma.employee.findUniqueOrThrow({ where: { id } });
    return employee;
  };
}

export const employeesService = new EmployeesService();
