import { Employee, Prisma } from '@prisma/client';
import { prisma } from '~/common/services';
import { PageData } from '~/common/types';
import { GetEmployeesQuery } from './types';

class EmployeesService {
  getAll = async ({
    q,
    isFop,
    storeId,
    employerId,
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
      const conditions = ['code1C', 'inn', 'name', 'phone'].map(item => ({
        [item]: { contains: q },
      }));
      where.OR = conditions;
    }
    if (isFop !== undefined) {
      where.isFop = isFop;
    }
    if (storeId) {
      where.OR = [
        { workplacesHr: { some: { storeId } } },
        { workplacesBuh: { some: { storeId } } },
      ];
    }
    if (employerId) {
      where.workplacesBuh = { some: { employerId } };
    }

    const [data, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          workplacesHr: { include: { store: true } },
          workplacesBuh: { include: { store: true, employer: true } },
        },
      }),
      prisma.employee.count({ where }),
    ]);

    return { data, page, pageSize, total };
  };

  getOne = (id: string): Promise<Employee> => {
    return prisma.employee.findUniqueOrThrow({ where: { id } });
  };

  updateOne = (id: string, data: Prisma.EmployeeUpdateInput): Promise<Employee> => {
    return prisma.employee.update({ where: { id }, data });
  };
}

export const employeesService = new EmployeesService();
