import { z } from 'zod';
import {
  CreateNoteBodySchema,
  CreateNoteSchema,
  GetNotesSchema,
  NoteByIdSchema,
  NotesQuerySchema,
  UpdateNoteBodySchema,
  UpdateNoteSchema,
} from '../validation';

export type NotesQuery = z.infer<typeof NotesQuerySchema>;
export type CreateNoteBody = z.infer<typeof CreateNoteBodySchema>;
export type UpdateNoteBody = z.infer<typeof UpdateNoteBodySchema>;

export type GetNotes = z.infer<typeof GetNotesSchema>;
export type GetNoteById = z.infer<typeof NoteByIdSchema>;
export type CreateNote = z.infer<typeof CreateNoteSchema>;
export type UpdateNote = z.infer<typeof UpdateNoteSchema>;
