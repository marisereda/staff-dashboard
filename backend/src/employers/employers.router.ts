import { Router } from 'express';
import { handler, validator } from '~/common/middlewares';
import { create, deleteOne, getAll, getOne, updateOne } from './employers.controller';
import {
  CreateEmployerSchema,
  EmployerByIdSchema,
  GetEmployersSchema,
  UpdateEmployerSchema,
} from './validation';

export const employersRouter = Router();

employersRouter.get('/', validator(GetEmployersSchema), handler(getAll));

employersRouter.get('/:id', validator(EmployerByIdSchema), handler(getOne));

employersRouter.post('/', validator(CreateEmployerSchema), handler(create));

employersRouter.patch('/:id', validator(UpdateEmployerSchema), handler(updateOne));

employersRouter.delete('/:id', validator(EmployerByIdSchema), handler(deleteOne));
