import { Router } from 'express';
import { handler, validator } from '~/lib/middlewares';
import * as storesController from './stores.controller';
import { GetStoresSchema } from './stores.schema';

export const storesRouter = Router();

storesRouter.get('/', validator(GetStoresSchema), handler(storesController.getAll));
