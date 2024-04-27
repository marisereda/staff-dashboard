import { Response } from 'express';
import { AppRequest } from '~/common/types';
import { employersService } from './employers.service';
import {
  CreateEmployerRequest,
  EmployerByIdRequest,
  GetEmployersRequest,
  UpdateEmployerRequest,
} from './types';

export const getAll = async (
  req: AppRequest<GetEmployersRequest>,
  res: Response
): Promise<void> => {
  const result = await employersService.getAll(req.state!.query);
  res.status(200).json(result);
};

export const getById = async (
  req: AppRequest<EmployerByIdRequest>,
  res: Response
): Promise<void> => {
  const employer = await employersService.getById(req.state!.params.id);
  res.status(200).json(employer);
};

export const create = async (
  req: AppRequest<CreateEmployerRequest>,
  res: Response
): Promise<void> => {
  const employer = await employersService.create(req.state!.body);
  res.status(200).json(employer);
};

export const update = async (
  req: AppRequest<UpdateEmployerRequest>,
  res: Response
): Promise<void> => {
  const employer = await employersService.update(req.state!.params.id, req.state!.body!);
  res.status(200).json(employer);
};

export const deleteOne = async (
  req: AppRequest<EmployerByIdRequest>,
  res: Response
): Promise<void> => {
  await employersService.deleteOne(req.state!.params.id);
  res.status(204).end();
};
