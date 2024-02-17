import { Router } from 'express';
import { handler, validator } from '~/common/middlewares';
import { getAll, getById } from './employees.controller';
import { GetEmployeeByIdSchema, GetEmployeesSchema } from './validation';

export const employeesRouter = Router();

employeesRouter.get('/', validator(GetEmployeesSchema), handler(getAll));

employeesRouter.get('/:id', validator(GetEmployeeByIdSchema), handler(getById));

employeesRouter.get('/:id/changes', () => {});
