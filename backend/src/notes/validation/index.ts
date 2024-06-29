import { z } from 'zod';

export const GetNotesSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    ownerId: z.string().cuid(),
    isDone: z.boolean().optional(),
    isImportant: z.boolean().optional(),
    sortBy: z
      .enum(['title', 'isDone', 'isImportant', 'createdAt', 'updatedAt'])
      .default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    page: z.coerce.number().int().gte(1).default(1),
    pageSize: z.coerce.number().int().gte(1).lte(100).default(50),
  }),
});

export const NoteByIdSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export const CreateNoteSchema = z.object({
  body: z.object({
    ownerId: z.string().cuid(),
    ownerType: z.enum(['employee', 'employer', 'store']).optional(),
    title: z.string().optional(),
    content: z.string().optional(),
    isDone: z.boolean().default(false),
    isImportant: z.boolean().default(false),
  }),
});

export const UpdateNoteSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    isDone: z.boolean().optional(),
    isImportant: z.boolean().optional(),
  }),
});
