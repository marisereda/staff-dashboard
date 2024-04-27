import { Response } from 'express';
import { AppRequest } from '~/common/types';
import { notesService } from './notes.service';
import { CreateNoteRequest, GetNotesRequest, NoteByIdRequest, UpdateNoteRequest } from './types';

export const getAll = async (req: AppRequest<GetNotesRequest>, res: Response): Promise<void> => {
  const result = await notesService.getAll(req.state!.query);
  res.status(200).json(result);
};

export const getById = async (req: AppRequest<NoteByIdRequest>, res: Response): Promise<void> => {
  const note = await notesService.getById(req.state!.params.id);
  res.status(200).json(note);
};

export const create = async (req: AppRequest<CreateNoteRequest>, res: Response): Promise<void> => {
  const note = await notesService.create(req.state!.body);

  res.status(200).json(note);
};

export const update = async (req: AppRequest<UpdateNoteRequest>, res: Response): Promise<void> => {
  const note = await notesService.update(req.state!.params.id, req.state!.body);
  res.status(200).json(note);
};

export const deleteOne = async (req: AppRequest<NoteByIdRequest>, res: Response): Promise<void> => {
  await notesService.deleteOne(req.state!.params.id);
  res.status(204).end();
};
