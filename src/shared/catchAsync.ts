import { NextFunction, Request, Response } from 'express';

export const catchAsync = fn => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res);
    } catch (error) {
      next(error);
    }
  };
};
