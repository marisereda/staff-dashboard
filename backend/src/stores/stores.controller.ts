import { Response } from 'express';
import { AppRequest } from '~/common/types';
import { storesService } from './stores.service';
import { GetStoresRequest, UpdateStoreRequest } from './types';

export const getAll = async (req: AppRequest<GetStoresRequest>, res: Response): Promise<void> => {
  const result = await storesService.getAll(req.state!.query);
  res.status(200).json(result);
};

export const updateById = async (
  req: AppRequest<UpdateStoreRequest>,
  res: Response
): Promise<void> => {
  const result = await storesService.updateOne(req.state!.params.id, req.state!.body);
  res.status(200).json(result);
};
