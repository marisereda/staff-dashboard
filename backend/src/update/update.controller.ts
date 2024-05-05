import { Response } from 'express';
import { AppRequest } from '~/common/types';
import { UpdateBuhRequest, UpdateFopRequest, UpdateHrRequest } from './types';
import { updateBuhService } from './update-buh.service';
import { updateFopService } from './update-fop.service';
import { updateHrService } from './update-hr.service';

export const updateHr = async (req: AppRequest<UpdateHrRequest>, res: Response): Promise<void> => {
  const file = req.state!.file.buffer;
  await updateHrService.updateFromReport(file);
  res.status(204).end();
};

export const updateBuh = async (
  req: AppRequest<UpdateBuhRequest>,
  res: Response
): Promise<void> => {
  const file = req.state!.file.buffer;
  await updateBuhService.updateFromReport(req.state!.body.employerId, file);
  res.status(204).end();
};

export const updateFop = async (
  req: AppRequest<UpdateFopRequest>,
  res: Response
): Promise<void> => {
  const file = req.state!.file.buffer;
  const notFoundFops = await updateFopService.updateFromReport(file);
  if (notFoundFops) {
    res.statusCode = 200;
    res.setHeader('Content-Disposition', 'attachment; filename="DislocationReport.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.ms-excel');
    res.end(notFoundFops);
  } else {
    res.status(204).end();
  }
};
