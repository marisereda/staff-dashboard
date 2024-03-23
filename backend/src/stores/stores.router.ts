import { Router } from 'express';
import { handler, validator } from '~/common/middlewares';
import { getAll, updateById } from './stores.controller';
import { GetStoresSchema, UpdateStoreSchema } from './validation';

export const storesRouter = Router();

storesRouter.get('/', validator(GetStoresSchema), handler(getAll));
storesRouter.patch(
  '/:id',
  (req, res, next) => {
    // console.log('⚠️', req);

    next();
  },
  validator(UpdateStoreSchema),
  handler(updateById)
);
