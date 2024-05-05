import { Router } from 'express';
import { handler, validator } from '~/common/middlewares';
import { getAll, getOne, updateOne } from './stores.controller';
import { GetStoresSchema, StoreByIdSchema, UpdateStoreSchema } from './validation';

export const storesRouter = Router();

storesRouter.get('/', validator(GetStoresSchema), handler(getAll));

storesRouter.get('/:id', validator(StoreByIdSchema), handler(getOne));

storesRouter.patch('/:id', validator(UpdateStoreSchema), handler(updateOne));
