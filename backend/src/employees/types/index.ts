import { Prisma, Store } from '@prisma/client';
import { z } from 'zod';
import { EmployeesQuerySchema, GetEmployeeByIdSchema, GetEmployeesSchema } from '../validation';

export type CreateEmployeeData = Prisma.EmployeeUncheckedCreateInput & {
  store?: {
    code1C: Store['code1C'];
  };
};

export type EmployeesQuery = z.infer<typeof EmployeesQuerySchema>;
export type EmployeeParams = z.infer<typeof GetEmployeesSchema>;

export type GetEmployees = z.infer<typeof GetEmployeesSchema>;
export type GetEmployeeById = z.infer<typeof GetEmployeeByIdSchema>;
