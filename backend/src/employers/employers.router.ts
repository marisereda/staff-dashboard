import { Router } from 'express';
import { handler, validator } from '~/lib/middlewares';
import * as employersController from './employers.controller';
import { EmployerByIdSchema, GetEmployersSchema } from './employers.schema';

export const employersRouter = Router();

employersRouter.get('/', validator(GetEmployersSchema), handler(employersController.getAll));

employersRouter.get('/:id', validator(EmployerByIdSchema), handler(employersController.getById));
