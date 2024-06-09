import { Router } from 'express';
import { handler, validator } from '~/common/middlewares';
import { deleteBuhWorkplace, deleteOne, getAll, getOne, updateOne } from './employees.controller';
import {
  DeleteWorkplaceSchema,
  EmployeeByIdSchema,
  GetEmployeesSchema,
  UpdateEmployeeSchema,
} from './validation';

export const employeesRouter = Router();

employeesRouter.get('/', validator(GetEmployeesSchema), handler(getAll));

employeesRouter.get('/:id', validator(EmployeeByIdSchema), handler(getOne));

employeesRouter.patch('/:id', validator(UpdateEmployeeSchema), handler(updateOne));

employeesRouter.delete('/:id', validator(EmployeeByIdSchema), handler(deleteOne));

employeesRouter.delete(
  '/:id/workplace/:workplaceId',
  validator(DeleteWorkplaceSchema),
  handler(deleteBuhWorkplace)
);
