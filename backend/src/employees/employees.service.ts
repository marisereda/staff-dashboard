import { Employee, Prisma } from '@prisma/client';
import { prisma } from '~/common/services';
import { PageData } from '~/common/types';
import { storesService } from '~/stores/stores.service';
import { CreateEmployeeData, EmployeesQuery } from './types';

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
    console.log('⚠️ data:', data);

    return { data, page, pageSize, total };
  };

  getById = async (id: string): Promise<Employee | null> => {
    const employee = await prisma.employee.findUniqueOrThrow({ where: { id } });
    return employee;
  };

  getByCode1C = (code1C: Employee['code1C']): Promise<Employee | null> => {
    return prisma.employee.findUnique({ where: { code1C } });
  };

  markDeleteByCode1C = async (code1CList: Employee['code1C'][]): Promise<void> => {
    await prisma.employee.updateMany({
      where: {
        code1C: {
          notIn: code1CList,
        },
      },
      data: {
        markDelete: true,
      },
    });
  };

  create = async ({ store, ...data }: CreateEmployeeData): Promise<void> => {
    const foundStore = await storesService.getByCode1C(store.code1C);
    await prisma.employee.create({
      data: { ...data, storeId: foundStore?.id ?? null },
    });
  };

  update = async (
    currentData: Employee,
    { position, store, ...newData }: CreateEmployeeData
  ): Promise<void> => {
    const data: Partial<Employee> = { ...newData };

    const newStore = await storesService.getByCode1C(store.code1C);
    const newStoreId = newStore?.id ?? null;

    data.newPosition = currentData.position !== position ? position : null;
    data.newStoreId = currentData.storeId !== newStoreId ? newStoreId : null;

    await prisma.employee.update({ where: { id: currentData.id }, data });
  };

  updateByCode1C = async (employees: CreateEmployeeData[]): Promise<void> => {
    for (const employeeData of employees) {
      const currentEmployee = await this.getByCode1C(employeeData.code1C);
      if (!currentEmployee) {
        await this.create(employeeData);
      } else {
        await this.update(currentEmployee, employeeData);
      }
    }
  };
}

export const employeesService = new EmployeesService();
