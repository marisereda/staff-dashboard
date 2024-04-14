import { Response } from 'express';
import { AppRequest } from '~/common/types';
import { UpdateBuh, UpdateHr } from './types';
import { updateBuhService } from './update-buh.service';
import { updateFopService } from './update-fop.service';
import { updateHrService } from './update-hr.service';

export const updateBuh = async (req: AppRequest<UpdateBuh>, res: Response): Promise<void> => {
  const file = req.state!.file.buffer;
  updateBuhService.updateFromReport(file!, req.state!.body.employerId);

  res.status(200).send({ relult: 'success' });
};

export const updateHr = async (req: AppRequest<UpdateHr>, res: Response): Promise<void> => {
  const file = req.state!.file.buffer;

  updateHrService.updateFromReport(file!);

  res.status(200).send({ relult: 'success' });
};

export const updateFop = async (req: AppRequest<UpdateHr>, res: Response): Promise<void> => {
  const file = req.state!.file.buffer;

  const updateResult = await updateFopService.updateFromReport(file!);
  if (updateResult.length === 0) {
    res
      .status(400)
      .send({ result: 'Check uploading file, there is no information about FOP in it' });
  }

  res.status(200).send({ relult: 'success' });
};
