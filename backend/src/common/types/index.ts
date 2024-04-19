import { NextFunction, Request, Response } from 'express';

export type NonNullableKeys<Type> = {
  [Key in keyof Type]: NonNullableKeys<NonNullable<Type[Key]>>;
};

export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type AppRequest<TState = object> = Request & {
  state?: TState;
};

export type PageData<TData> = {
  data: TData;
  page: number | undefined;
  pageSize: number | undefined;
  total: number;
};
