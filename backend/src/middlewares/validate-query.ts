import { NextFunction, Response } from "express";
import { AppRequest } from "../types/app.types";
import { fromZodError } from "zod-validation-error";
import { ZodError, ZodType } from "zod";

export const validateQuery =
  <T extends ZodType>(schema: T) =>
  (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const query = schema.parse(req.query);
      req.state = { ...req.state, query };
      next();
    } catch (err) {
      const { message } = fromZodError(err as ZodError);
      res.status(400).json({ message });
    }
  };
