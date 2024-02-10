import { Router } from 'express';
import multer from 'multer';
import { handler, validator } from '~/lib/middlewares';
import * as updateController from './update.controller';
import { UpdateBuhSchema, UpdateHrSchema } from './update.schema';

export const upload = multer();

export const updateRouter = Router();

updateRouter.post(
  '/buh',
  upload.single('file'),
  validator(UpdateBuhSchema),
  handler(updateController.updateBuh)
);

updateRouter.post(
  '/hr',
  upload.single('file'),
  validator(UpdateHrSchema),
  handler(updateController.updateHr)
);
