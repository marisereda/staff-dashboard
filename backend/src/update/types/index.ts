import { z } from "zod";
import { UpdateBuhSchema, UpdateHrSchema } from "../validation";

export type UpdateBuh = z.infer<typeof UpdateBuhSchema>;
export type UpdateHr = z.infer<typeof UpdateHrSchema>;
