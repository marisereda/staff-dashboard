import { z } from 'zod';

const EXCEL_MIME_TYPES = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const FileSchema = z
  .any()
  .refine((file: Express.Multer.File) => Boolean(file), { message: 'File is required' })
  .refine((file: Express.Multer.File) => EXCEL_MIME_TYPES.includes(file?.mimetype), {
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
