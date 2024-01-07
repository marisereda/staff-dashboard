import { Router } from 'express';
import { employeesController } from '../controllers';
import { handler, validator } from '../middlewares';
import { GetEmployeeByIdSchema, GetEmployeesSchema } from '../schemas';

export const employeesRouter = Router();

employeesRouter.get('/', validator(GetEmployeesSchema), handler(employeesController.getAll));
employeesRouter.get('/:id', validator(GetEmployeeByIdSchema), handler(employeesController.getById));
employeesRouter.get('/:id/changes', () => {});
