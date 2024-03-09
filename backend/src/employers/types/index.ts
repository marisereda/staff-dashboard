import { z } from 'zod';
import {
  CreateEmployerBodySchema,
  CreateEmployerSchema,
  EmployerByIdSchema,
  EmployersQuerySchema,
  GetEmployersSchema,
  UpdateEmployerBodySchema,
  UpdateEmployerSchema,
} from '../validation';


export type EmployersQuery = z.infer<typeof EmployersQuerySchema>;
export type CreateEmployerBody = z.infer<typeof CreateEmployerBodySchema>;
export type UpdateEmployerBody = z.infer<typeof UpdateEmployerBodySchema>;

export type GetEmployers = z.infer<typeof GetEmployersSchema>;
export type EmployerById = z.infer<typeof EmployerByIdSchema>;
export type CreateEmployer = z.infer<typeof CreateEmployerSchema>;
export type UpdateEmployer = z.infer<typeof UpdateEmployerSchema>;
