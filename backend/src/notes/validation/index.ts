import { z } from 'zod';

export const NotesQuerySchema = z.object({
  q: z.string().optional(),
  ownerId: z.string().cuid().optional(),
  sortBy: z.enum(['ownerId', 'title', 'isDone', 'isImportant']).default('ownerId'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  page: z.coerce.number().int().gte(1).default(1),
  pageSize: z.coerce.number().int().gte(1).lte(100).default(50),
});

export const CreateNoteBodySchema = z.object({
  ownerId: z.string().cuid().optional(),
  ownerType: z.enum(['employee', 'employer', 'store']).optional(),
  title: z.string(),
  content: z.string().optional(),
  isDone: z.boolean().default(false),
  isImportant: z.boolean().default(false),
});

export const UpdateNoteBodySchema = CreateNoteBodySchema.optional();

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
