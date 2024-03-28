import { Router } from 'express';
import { handler } from '~/common/middlewares';
import * as reportController from './report.controller';

export const reportRouter = Router();

reportRouter.get('/', handler(reportController.getReport));
