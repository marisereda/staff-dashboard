import { Router } from 'express';
import { handler, validator } from '~/common/middlewares';
import { getAll, getOne, updateOne } from './employees.controller';
import { EmployeeByIdSchema, GetEmployeesSchema, UpdateEmployeeSchema } from './validation';

export const employeesRouter = Router();

employeesRouter.get('/', validator(GetEmployeesSchema), handler(getAll));

employeesRouter.get('/:id', validator(EmployeeByIdSchema), handler(getOne));

employeesRouter.patch('/:id', validator(UpdateEmployeeSchema), handler(updateOne));
