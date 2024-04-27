import { z } from 'zod';
import { UpdateBuhSchema, UpdateFopSchema, UpdateHrSchema } from '../validation';

export type UpdateBuhRequest = z.infer<typeof UpdateBuhSchema>;
export type UpdateHrRequest = z.infer<typeof UpdateHrSchema>;
export type UpdateFopRequest = z.infer<typeof UpdateFopSchema>;
