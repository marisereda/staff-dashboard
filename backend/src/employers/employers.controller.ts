import { Response } from 'express';
import { AppRequest } from '~/types';
import { GetEmployers } from './employers.schema';
import * as employersService from './employers.service';

export const getAll = async (req: AppRequest<GetEmployers>, res: Response): Promise<void> => {
  const result = await employersService.getAll(req.state!.query);
  res.status(200).json(result);
};
