import { z } from 'zod';

const FileSchema = z
  .any()
  .refine((file: Express.Multer.File) => Boolean(file), { message: 'File is required' })
  .refine((file: Express.Multer.File) => file?.mimetype === 'application/vnd.ms-excel', {
    message: 'Only .xls, .xlsx formats are supported',
  });

export const UpdateBuhSchema = z.object({
  body: z.object({
    inn: z.string(),
  }),
  file: FileSchema,
});

export const UpdateHrSchema = z.object({
  file: FileSchema,
});

export type UpdateBuh = z.infer<typeof UpdateBuhSchema>;
export type UpdateHr = z.infer<typeof UpdateHrSchema>;
