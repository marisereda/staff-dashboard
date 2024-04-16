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
    if (q) {
      const conditions = ['inn', 'name', 'phone', 'position'].map(item => ({
        [item]: { contains: q },
      }));
      where.OR = conditions;
    }
    if (isFop !== undefined) {
      where.isFop = isFop;
    }
    if (employerId) {
      where.employerId = employerId;
    }
    if (storeId) {
      where.storeId = storeId;
    }

    let orderBy;
    if (sortBy === 'employerName') {
      orderBy = { employer: { name: sortOrder } };
    } else if (sortBy === 'storeAddress') {
      orderBy = { store: { address: sortOrder } };
    } else {
      orderBy = { [sortBy]: sortOrder };
    }

    const skip = pageSize * (page - 1);
    const take = pageSize;

    const data = await prisma.employee.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { employer: true, store: true },
    });
    const total = await prisma.employee.count({ where });

    return { data, page, pageSize, total };
  };

  getById = async (id: string): Promise<Employee | null> => {
    const employee = await prisma.employee.findUniqueOrThrow({ where: { id } });
    return employee;
  };

  getByCode1C = (code1C: Employee['code1C']): Promise<Employee | null> => {
    return prisma.employee.findFirst({ where: { code1C } });
  };

  markDeleteByCode1C = async (code1CList: string[]): Promise<void> => {
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
    const foundStore = store ? await storesService.getByCode1C(store.code1C) : null;

    await prisma.employee.create({
      data: {
        ...data,
        storeId: foundStore?.id ?? null,
      },
    });
  };

  update = async (
    currentData: Employee,
    { position, store, ...data }: CreateEmployeeData
  ): Promise<void> => {
    if (store) {
      const newStore = await storesService.getByCode1C(store.code1C);
      const newStoreId = newStore?.id ?? null;
      data.newStoreId = currentData.storeId !== newStoreId ? newStoreId : null;
    }

    if (position) {
      data.newPosition = currentData.position !== position ? position : null;
    }

    await prisma.employee.update({ where: { id: currentData.id }, data });
  };

  updateMany = async (employees: CreateEmployeeData[]): Promise<void> => {
    for (const employeeData of employees) {
      let currentEmployee: Employee | null = null;

      if (employeeData.id) {
        currentEmployee = await this.getById(employeeData.id);
      }
      if (!currentEmployee && employeeData.code1C) {
        currentEmployee = await this.getByCode1C(employeeData.code1C);
      }
      if (!currentEmployee && employeeData.inn) {
        currentEmployee = await prisma.employee.findFirst({
          where: { inn: employeeData.inn! },
        });
      }

      if (!currentEmployee) {
        await this.create(employeeData);
      } else {
        await this.update(currentEmployee, employeeData);
      }
    }
  };

  updateManyByInn = async (inns: string[], employeeData: Partial<Employee>): Promise<void> => {
    await prisma.employee.updateMany({
      where: { inn: { in: inns } },
      data: employeeData,
    });
  };

  updateAll = async (employeeData: Partial<Employee>): Promise<void> => {
    await prisma.employee.updateMany({
      data: employeeData,
    });
  };

  getManyByInn = async (inns: string[]): Promise<Employee[]> => {
    const employees = await prisma.employee.findMany({
      where: { inn: { in: inns } },
    });
    return employees;
  };
}

export const employeesService = new EmployeesService();
