import { z } from 'zod';
import {
  CreateEmployerSchema,
  EmployerByIdSchema,
  GetEmployersSchema,
  UpdateEmployerSchema,
} from '../validation';

export type GetEmployersRequest = z.infer<typeof GetEmployersSchema>;
export type GetEmployerRequest = z.infer<typeof EmployerByIdSchema>;
export type CreateEmployerRequest = z.infer<typeof CreateEmployerSchema>;
export type UpdateEmployerRequest = z.infer<typeof UpdateEmployerSchema>;
export type DeleteEmployerRequest = z.infer<typeof EmployerByIdSchema>;

export type GetEmployersQuery = GetEmployersRequest['query'];
