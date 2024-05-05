import { Response } from 'express';
import { AppRequest } from '~/common/types';
import { storesService } from './stores.service';
import { GetStoreRequest, GetStoresRequest, UpdateStoreRequest } from './types';

export const getAll = async (req: AppRequest<GetStoresRequest>, res: Response): Promise<void> => {
  const storesPage = await storesService.getAll(req.state!.query);
  res.status(200).json(storesPage);
};

export const getOne = async (req: AppRequest<GetStoreRequest>, res: Response): Promise<void> => {
  const store = await storesService.getOne(req.state!.params.id);
  res.status(200).json(store);
};

export const updateOne = async (
  req: AppRequest<UpdateStoreRequest>,
  res: Response
): Promise<void> => {
  const store = await storesService.updateOne(req.state!.params.id, req.state!.body);
  res.status(200).json(store);
};
