import { Employee, Prisma } from '@prisma/client';
import { prisma } from '~/common/services';
import { PageData } from '~/common/types';
import { employersService } from '~/employers/employers.service';
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

  create = async ({ store, employer, ...data }: CreateEmployeeData): Promise<void> => {
    const foundStore = store ? await storesService.getByCode1C(store.code1C) : null;
    const foundEmployer = employer ? await employersService.getByInn(employer.inn) : null;

    await prisma.employee.create({
      data: {
        ...data,
        storeId: foundStore?.id ?? null,
        employerId: foundEmployer?.id ?? null,
      },
    });
  };

  update = async (
    currentData: Employee,
    { position, store, employer, ...data }: CreateEmployeeData
  ): Promise<void> => {
    const newStore = store ? await storesService.getByCode1C(store.code1C) : null;
    const newStoreId = newStore?.id ?? null;

    const newEmployer = employer ? await employersService.getByInn(employer.inn) : null;

    if (position) {
      data.newPosition = currentData.position !== position ? position : null;
    }
    data.newStoreId = currentData.storeId !== newStoreId ? newStoreId : null;
    data.employerId = newEmployer?.id ?? null;

    await prisma.employee.update({ where: { id: currentData.id }, data });
  };

  updateByCode1C = async (employees: CreateEmployeeData[]): Promise<void> => {
    for (const employeeData of employees) {
      const currentEmployee = employeeData.code1C
        ? await this.getByCode1C(employeeData.code1C)
        : null;

      if (!currentEmployee) {
        await this.create(employeeData);
      } else {
        await this.update(currentEmployee, employeeData);
      }
    }
  };

  updateByInn = async (employees: CreateEmployeeData[]): Promise<void> => {
    for (const employeeData of employees) {
      const currentEmployee = await prisma.employee.findFirst({
        where: { inn: employeeData.inn! },
      });
      if (!currentEmployee) {
        await this.create(employeeData);
      } else {
        await this.update(currentEmployee, employeeData);
      }
    }
  };
}

export const employeesService = new EmployeesService();
