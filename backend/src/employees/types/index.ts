import { Prisma, Store } from '@prisma/client';
import { z } from 'zod';
import { NonNullableKeys } from '~/common/types';
import { GetEmployeeByIdSchema, GetEmployeesSchema, UpdateEmployeeSchema } from '../validation';

export type CreateEmployeeData = Prisma.EmployeeUncheckedCreateInput & {
  store?: {
    code1C: Store['code1C'];
  };
  position: string;
};

export type GetEmployeesRequest = z.infer<typeof GetEmployeesSchema>;
export type GetEmployeeByIdRequest = z.infer<typeof GetEmployeeByIdSchema>;
export type UpdateEmployeeRequest = NonNullableKeys<z.infer<typeof UpdateEmployeeSchema>>;

export type GetEmployeesQuery = GetEmployeesRequest['query'];
