import { z } from 'zod';
import { CreateNoteSchema, GetNotesSchema, NoteByIdSchema, UpdateNoteSchema } from '../validation';

export type GetNotesRequest = z.infer<typeof GetNotesSchema>;
export type NoteByIdRequest = z.infer<typeof NoteByIdSchema>;
export type CreateNoteRequest = z.infer<typeof CreateNoteSchema>;
export type UpdateNoteRequest = z.infer<typeof UpdateNoteSchema>;

export type GetNotesQuery = GetNotesRequest['query'];
export type CreateNoteData = CreateNoteRequest['body'];
export type UpdateNoteData = UpdateNoteRequest['body'];
