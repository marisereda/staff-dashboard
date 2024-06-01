import { Request, Response } from 'express';
import { AppRequest } from '~/common/types';
import { GetStoreRequest } from '~/stores/types';
import { reportService } from './report.service';

export const getReport = async (_: Request, res: Response): Promise<void> => {
  const reportFile = await reportService.getReport();

  res.statusCode = 200;
  res.setHeader('Content-Disposition', 'attachment; filename="DislocationReport.xlsx"');
  res.setHeader('Content-Type', 'application/vnd.ms-excel');
  res.end(reportFile);
};

export const getEmployedEmpoloyees = async (
  req: AppRequest<GetStoreRequest>,
  res: Response
): Promise<void> => {
  const freelancers = await reportService.getFreelancersInStore(req.state!.params?.id);
  const employed = await reportService.getEmployedInStore(req.state!.params?.id);

  const result = { employedStaff: employed, employedFreelancers: freelancers };

  res.status(200).json(result);
};
