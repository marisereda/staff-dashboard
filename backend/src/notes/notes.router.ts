import { Router } from 'express';
import { handler, validator } from '~/common/middlewares';
import { create, deleteOne, getAll, getById, update } from './notes.controller';
import { CreateNoteSchema, GetNotesSchema, NoteByIdSchema, UpdateNoteSchema } from './validation';

export const notesRouter = Router();

notesRouter.get('/', validator(GetNotesSchema), handler(getAll));

notesRouter.get('/:id', validator(NoteByIdSchema), handler(getById));

notesRouter.post('/', validator(CreateNoteSchema), handler(create));

notesRouter.patch('/:id', validator(UpdateNoteSchema), handler(update));

notesRouter.delete('/:id', validator(NoteByIdSchema), handler(deleteOne));
