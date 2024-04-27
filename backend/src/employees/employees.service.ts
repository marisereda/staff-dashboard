import { Employee, Prisma } from '@prisma/client';
import { prisma } from '~/common/services';
import { PageData } from '~/common/types';
import { GetEmployeesQuery } from './types';

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
  }: GetEmployeesQuery): Promise<PageData<Employee[]>> => {
    const where: Prisma.EmployeeWhereInput = {};
    const orderBy = { [sortBy]: sortOrder };
    const skip = pageSize * (page - 1);
    const take = pageSize;

    if (q) {
      const conditions = ['inn', 'name', 'phone'].map(item => ({
        [item]: { contains: q },
      }));
      where.OR = conditions;
    }
    if (isFop !== undefined) {
      where.isFop = isFop;
    }
    if (employerId) {
      where.employeeEmployers = { some: { employerId } };
    }
    if (storeId) {
      where.employeeStores = { some: { storeId } };
    }

    const data = await prisma.employee.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        employeeStores: { include: { store: true } },
        employeeEmployers: { include: { employer: true } },
      },
    });
    const total = await prisma.employee.count({ where });

    return { data, page, pageSize, total };
  };

  getById = (id: string): Promise<Employee | null> => {
    return prisma.employee.findUniqueOrThrow({ where: { id } });
  };

  updateOne = (id: string, data: Prisma.EmployeeUncheckedUpdateInput): Promise<Employee> => {
    return prisma.employee.update({ where: { id }, data });
  };
}

export const employeesService = new EmployeesService();
