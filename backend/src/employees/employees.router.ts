import { Router } from 'express';
import { handler, validator } from '~/lib/middlewares';
import * as employeesController from './employees.controller';
import { GetEmployeeByIdSchema, GetEmployeesSchema } from './employees.schema';

export const employeesRouter = Router();

employeesRouter.get('/', validator(GetEmployeesSchema), handler(employeesController.getAll));

employeesRouter.get('/:id', validator(GetEmployeeByIdSchema), handler(employeesController.getById));

employeesRouter.get('/:id/changes', () => {});
