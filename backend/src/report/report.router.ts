import { Router } from 'express';
import { handler, validator } from '~/common/middlewares';
import { StoreByIdSchema } from '~/stores/validation';
import * as reportController from './report.controller';

export const reportRouter = Router();

reportRouter.get('/', handler(reportController.getReport));

reportRouter.get(
  '/store/:id/employees',
  validator(StoreByIdSchema),
  handler(reportController.getEmployedEmpoloyees)
);
