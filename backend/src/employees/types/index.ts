import { z } from 'zod';
import { NonNullableKeys } from '~/common/types';
import { EmployeeByIdSchema, GetEmployeesSchema, UpdateEmployeeSchema } from '../validation';

export type GetEmployeesRequest = z.infer<typeof GetEmployeesSchema>;
export type GetEmployeeRequest = z.infer<typeof EmployeeByIdSchema>;
export type UpdateEmployeeRequest = NonNullableKeys<z.infer<typeof UpdateEmployeeSchema>>;

export type GetEmployeesQuery = GetEmployeesRequest['query'];
