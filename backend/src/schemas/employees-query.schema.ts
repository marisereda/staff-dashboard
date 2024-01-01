import { z } from "zod";

export const EmployeesQuerySchema = z.object({
  q: z.string().optional(),
  isFop: z
    .enum(["true", "false"])
    .transform(str => str === "true")
    .optional(),
  employerId: z.string().cuid().optional(),
  storeId: z.string().cuid().optional(),
  sortBy: z.enum(["name", "isFop", "position"]).default("name").optional(),
  sortOrder: z.enum(["asc", "desc"]).default("asc").optional(),
  page: z.coerce.number().int().gte(1).default(1).optional(),
  pageSize: z.coerce.number().int().gte(1).lte(100).default(50).optional(),
});

export type EmployeesQuery = z.infer<typeof EmployeesQuerySchema>;
