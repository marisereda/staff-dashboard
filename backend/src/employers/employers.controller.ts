import { Response } from 'express';
import { AppRequest } from '~/common/types';
import { employersService } from './employers.service';
import {
  CreateEmployerRequest,
  DeleteEmployerRequest,
  GetEmployerRequest,
  GetEmployersRequest,
  UpdateEmployerRequest,
} from './types';

export const getAll = async (
  req: AppRequest<GetEmployersRequest>,
  res: Response
): Promise<void> => {
  const employersPage = await employersService.getAll(req.state!.query);
  res.status(200).json(employersPage);
};

export const getOne = async (req: AppRequest<GetEmployerRequest>, res: Response): Promise<void> => {
  const employer = await employersService.getOne(req.state!.params.id);
  res.status(200).json(employer);
};

export const create = async (
  req: AppRequest<CreateEmployerRequest>,
  res: Response
): Promise<void> => {
  const employer = await employersService.create(req.state!.body);
  res.status(201).json(employer);
};

export const updateOne = async (
  req: AppRequest<UpdateEmployerRequest>,
  res: Response
): Promise<void> => {
  const employer = await employersService.updateOne(req.state!.params.id, req.state!.body);
  res.status(200).json(employer);
};

export const deleteOne = async (
  req: AppRequest<DeleteEmployerRequest>,
  res: Response
): Promise<void> => {
  await employersService.deleteOne(req.state!.params.id);
  res.status(204).end();
};
