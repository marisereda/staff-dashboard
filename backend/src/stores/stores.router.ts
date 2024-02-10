import { Router } from 'express';
import { handler, validator } from '~/lib/middlewares';
import { getAll } from './stores.controller';
import { GetStoresSchema } from './stores.schema';

export const storesRouter = Router();

storesRouter.get('/', validator(GetStoresSchema), handler(getAll));
