import { z } from 'zod';
import { UpdateNoteSchema } from '../validation';

export type UpdateNoteInputs = z.infer<typeof UpdateNoteSchema>;
