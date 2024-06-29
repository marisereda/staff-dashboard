import z from 'zod';

export const UpdateNoteSchema = z.object({
  content: z.string(),
  isDone: z.boolean(),
  isImportant: z.boolean(),
});
