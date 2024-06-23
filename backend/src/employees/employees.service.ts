import { Employee, Prisma } from '@prisma/client';
import { UpdateStatus } from '~/common/enums';
import { prisma } from '~/common/services';
import { PageData } from '~/common/types';
import { STATUS_FILTER_MAP } from './constants';
import { GetEmployeesQuery } from './types';

class EmployeesService {
  getAll = async ({
    q,
    isFop,
    statusFilter,
    storeId,
    employerId,
    sortBy,
    sortOrder,
    page,
    pageSize,
  }: GetEmployeesQuery): Promise<PageData<Employee[]>> => {
    const whereAnd: Prisma.EmployeeWhereInput[] = [];
    const orderBy = { [sortBy]: sortOrder };
    const skip = pageSize * (page - 1);
    const take = pageSize;

    if (q) {
      const conditions = ['code1C', 'inn', 'name', 'phone'].map(item => ({
        [item]: { contains: q },
      }));
      whereAnd.push({ OR: conditions });
    }
    if (isFop !== undefined) {
      whereAnd.push({ isFop });
    }
    if (statusFilter) {
      whereAnd.push(STATUS_FILTER_MAP[statusFilter]);
    }
    if (storeId) {
      const conditions = [
        { workplacesHr: { some: { storeId } } },
        { workplacesBuh: { some: { storeId } } },
      ];
      whereAnd.push({ OR: conditions });
    }
    if (employerId) {
      whereAnd.push({ workplacesBuh: { some: { employerId } } });
    }

    const [data, total] = await Promise.all([
      prisma.employee.findMany({
        where: { AND: whereAnd },
        orderBy,
        skip,
        take,
        include: {
          workplacesHr: { include: { store: true } },
          workplacesBuh: { include: { store: true, employer: true } },
        },
      }),
      prisma.employee.count({ where: { AND: whereAnd } }),
    ]);

    return { data, page, pageSize, total };
  };

  getOne = (id: string): Promise<Employee> => {
    return prisma.employee.findUniqueOrThrow({
      where: { id },
      include: {
        workplacesHr: { include: { store: true } },
        workplacesBuh: { include: { store: true, employer: true } },
      },
    });
  };

  updateOne = (id: string, data: Prisma.EmployeeUpdateInput): Promise<Employee> => {
    return prisma.employee.update({ where: { id }, data });
  };

  deleteOne = (id: string): Promise<Employee> => {
    return prisma.employee.delete({ where: { id } });
  };

  deleteBuhWorkplace = async (workplaceId: string): Promise<void> => {
    await prisma.workplaceBuh.delete({
      where: { id: workplaceId },
    });
    this.markFiredEmployeesAsDeleted();
  };

  markFiredEmployeesAsDeleted = async (): Promise<void> => {
    const unemployedEmployees = await prisma.employee.findMany({
      where: { workplacesBuh: { none: {} }, workplacesHr: { none: {} } },
      include: {
        workplacesBuh: true,
        workplacesHr: true,
      },
    });

    const idsUnemployed = unemployedEmployees.map(unemployedEmployee => unemployedEmployee.id);

    await prisma.employee.updateMany({
      where: { id: { in: idsUnemployed } },
      data: { updateStatusHr: UpdateStatus.DELETE },
    });
  };
}

export const employeesService = new EmployeesService();
