import { Response } from 'express';
import { AppRequest } from '../types';
import { GetStores } from './stores.schema';
import * as storesService from './stores.service';

export const getAll = async (req: AppRequest<GetStores>, res: Response): Promise<void> => {
  const result = await storesService.getAll(req.state!.query);
  res.status(200).json(result);
};
