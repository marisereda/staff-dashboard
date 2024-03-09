import { Response } from 'express';
import { AppRequest } from '~/common/types';
import { UpdateBuh, UpdateHr } from './types';
import { updateBuhService } from './update-buh.service';
import { updateHrService } from './update-hr.service';

export const updateBuh = async (req: AppRequest<UpdateBuh>, res: Response): Promise<void> => {
  const file = req.state!.file.buffer;
  updateBuhService.updateFromReport(file!, req.state!.body.employerId);

  res.status(200).json('result');
};

export const updateHr = async (req: AppRequest<UpdateHr>, res: Response): Promise<void> => {
  const file = req.state!.file.buffer;
  updateHrService.updateFromReport(file!);

  res.status(200).json('result');
};
