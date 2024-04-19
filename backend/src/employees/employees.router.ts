import { Router } from 'express';
import { handler, validator } from '~/common/middlewares';
import { getAll, getById, update } from './employees.controller';
import { GetEmployeeByIdSchema, GetEmployeesSchema, UpdateEmployeeSchema } from './validation';

export const employeesRouter = Router();

employeesRouter.get('/', validator(GetEmployeesSchema), handler(getAll));

employeesRouter.get('/:id', validator(GetEmployeeByIdSchema), handler(getById));

employeesRouter.get('/:id/changes', () => {});

employeesRouter.patch('/:id', validator(UpdateEmployeeSchema), handler(update));
