import { Request, Response } from 'express';
import { reportService } from './report.service';

export const getReport = async (_: Request, res: Response): Promise<void> => {
  reportService.getReport();

  res.status(200).end();
};
