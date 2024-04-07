import { Request, Response } from 'express';
import { reportService } from './report.service';

export const getReport = async (_: Request, res: Response): Promise<void> => {
  const buf = await reportService.getReport();

  res.statusCode = 200;
  res.setHeader('Content-Disposition', 'attachment; filename="DislocationReport.xlsx"');
  res.setHeader('Content-Type', 'application/vnd.ms-excel');
  res.end(buf);

  // res.status(200).end();
};
