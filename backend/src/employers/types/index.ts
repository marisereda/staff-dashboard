import { z } from 'zod';
import {
  CreateEmployerSchema,
  EmployerByIdSchema,
  GetEmployersSchema,
  UpdateEmployerSchema,
} from '../validation';

export type GetEmployersRequest = z.infer<typeof GetEmployersSchema>;
export type EmployerByIdRequest = z.infer<typeof EmployerByIdSchema>;
export type CreateEmployerRequest = z.infer<typeof CreateEmployerSchema>;
export type UpdateEmployerRequest = z.infer<typeof UpdateEmployerSchema>;

export type GetEmployersQuery = GetEmployersRequest['query'];
export type CreateEmployerData = CreateEmployerRequest['body'];
export type UpdateEmployerData = UpdateEmployerRequest['body'];
