import { Router } from 'express';
import { handler, validator } from '~/lib/middlewares';
import * as employersController from './employers.controller';
import {
  CreateEmployerSchema,
  EmployerByIdSchema,
  GetEmployersSchema,
  UpdateEmployerSchema,
} from './employers.schema';

export const employersRouter = Router();

employersRouter.get('/', validator(GetEmployersSchema), handler(employersController.getAll));

employersRouter.get('/:id', validator(EmployerByIdSchema), handler(employersController.getById));

employersRouter.post('/', validator(CreateEmployerSchema), handler(employersController.create));

employersRouter.patch('/:id', validator(UpdateEmployerSchema), handler(employersController.update));

employersRouter.delete(
  '/:id',
  validator(EmployerByIdSchema),
  handler(employersController.deleteOne)
);
