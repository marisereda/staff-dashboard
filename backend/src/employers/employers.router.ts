import { Router } from 'express';
import { handler, validator } from '~/lib/middlewares';
import * as employersController from './employers.controller';
import { GetEmployersSchema } from './employers.schema';

export const employersRouter = Router();

employersRouter.get('/', validator(GetEmployersSchema), handler(employersController.getAll));
