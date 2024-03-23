import { Response } from 'express';
import { AppRequest } from '~/common/types';
import { storesService } from './stores.service';
import { GetStores, UpdateStore } from './types';

export const getAll = async (req: AppRequest<GetStores>, res: Response): Promise<void> => {
  const result = await storesService.getAll(req.state!.query);
  res.status(200).json(result);
};

export const updateById = async (req: AppRequest<UpdateStore>, res: Response): Promise<void> => {
  const result = await storesService.updateById({ ...req.state!.body, ...req.state!.params });
  res.status(200).json(result);
};
