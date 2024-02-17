import { Router } from 'express';
import { handler, validator } from '~/common/middlewares';
import { create, deleteOne, getAll, getById, update } from './employers.controller';
import {
  CreateEmployerSchema,
  EmployerByIdSchema,
  GetEmployersSchema,
  UpdateEmployerSchema,
} from './validation';

export const employersRouter = Router();

employersRouter.get('/', validator(GetEmployersSchema), handler(getAll));

employersRouter.get('/:id', validator(EmployerByIdSchema), handler(getById));

employersRouter.post('/', validator(CreateEmployerSchema), handler(create));

employersRouter.patch('/:id', validator(UpdateEmployerSchema), handler(update));

employersRouter.delete('/:id', validator(EmployerByIdSchema), handler(deleteOne));
