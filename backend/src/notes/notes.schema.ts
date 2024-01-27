import { z } from 'zod';

const NotesQuerySchema = z.object({
  q: z.string().optional(),
  ownerId: z.string().cuid().optional(),
  sortBy: z.enum(['ownerId', 'title', 'isDone', 'isImportant']).default('ownerId'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  page: z.coerce.number().int().gte(1).default(1),
  pageSize: z.coerce.number().int().gte(1).lte(100).default(50),
});

const CreateNoteBodySchema = z.object({
  ownerId: z.string().cuid().optional(),
  ownerType: z.enum(['employee', 'employer', 'store']).optional(),
  title: z.string(),
  content: z.string().optional(),
  isDone: z.boolean().default(false),
  isImportant: z.boolean().default(false),
});

const UpdateNoteBodySchema = CreateNoteBodySchema.optional();

const NoteParamSchema = z.object({
  id: z.string().cuid(),
});

export const GetNotesSchema = z.object({
  query: NotesQuerySchema,
});

export const NoteByIdSchema = z.object({
  params: NoteParamSchema,
});

export const CreateNoteSchema = z.object({
  body: CreateNoteBodySchema,
});

export const UpdateNoteSchema = z.object({
  params: NoteParamSchema,
  body: UpdateNoteBodySchema,
});

export type NotesQuery = z.infer<typeof NotesQuerySchema>;
export type CreateNoteBody = z.infer<typeof CreateNoteBodySchema>;
export type UpdateNoteBody = z.infer<typeof UpdateNoteBodySchema>;

export type GetNotes = z.infer<typeof GetNotesSchema>;
export type GetNoteById = z.infer<typeof NoteByIdSchema>;
export type CreateNote = z.infer<typeof CreateNoteSchema>;
export type UpdateNote = z.infer<typeof UpdateNoteSchema>;
