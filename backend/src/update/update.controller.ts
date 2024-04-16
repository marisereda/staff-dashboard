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

  const buf = await updateFopService.updateFromReport(file!);
  if (!buf) {
    res.status(200).send({ relult: 'success' });
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Disposition', 'attachment; filename="DislocationReport.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.ms-excel');
    res.end(buf);
  }
};
