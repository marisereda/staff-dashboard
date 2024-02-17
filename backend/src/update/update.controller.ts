import { Response } from 'express';
import { AppRequest } from '~/common/types';
import { updateService } from './update.service';
import { UpdateBuh, UpdateHr } from './types';

export const updateBuh = async (req: AppRequest<UpdateBuh>, res: Response): Promise<void> => {
  const file = req.state!.file.buffer;
  updateService.updateFromBuhReport(file!, req.body.inn);

  res.status(200).json('result');
};

export const updateHr = async (req: AppRequest<UpdateHr>, res: Response): Promise<void> => {
  const file = req.state!.file.buffer;
  updateService.updateFromHrReport(file!);

  res.status(200).json('result');
};
