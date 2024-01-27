import { Router } from 'express';
import { handler, validator } from '~/lib/middlewares';
import * as notesController from './notes.controller';
import { CreateNoteSchema, GetNotesSchema, NoteByIdSchema, UpdateNoteSchema } from './notes.schema';

export const notesRouter = Router();

notesRouter.get('/', validator(GetNotesSchema), handler(notesController.getAll));

notesRouter.get('/:id', validator(NoteByIdSchema), handler(notesController.getById));

notesRouter.post('/', validator(CreateNoteSchema), handler(notesController.create));

notesRouter.patch('/:id', validator(UpdateNoteSchema), handler(notesController.update));

notesRouter.delete('/:id', validator(NoteByIdSchema), handler(notesController.deleteOne));
