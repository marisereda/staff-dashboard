import { Prisma, Store } from '@prisma/client';
import { z } from 'zod';
import { NonNullableKeys } from '~/common/types';
import {
  EmployeesQuerySchema,
  GetEmployeeByIdSchema,
  GetEmployeesSchema,
  UpdateEmployeeSchema,
} from '../validation';

export type CreateEmployeeData = Prisma.EmployeeUncheckedCreateInput & {
  store?: {
    code1C: Store['code1C'];
  };
};
export type UpdateEmployee = NonNullableKeys<z.infer<typeof UpdateEmployeeSchema>>;

export type EmployeesQuery = z.infer<typeof EmployeesQuerySchema>;
export type EmployeeParams = z.infer<typeof GetEmployeesSchema>;

export type GetEmployees = z.infer<typeof GetEmployeesSchema>;
export type GetEmployeeById = z.infer<typeof GetEmployeeByIdSchema>;
