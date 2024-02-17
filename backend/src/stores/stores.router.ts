import { Router } from 'express';
import { handler, validator } from '~/common/middlewares';
import { getAll } from './stores.controller';
import { GetStoresSchema } from './validation';

export const storesRouter = Router();

storesRouter.get('/', validator(GetStoresSchema), handler(getAll));
