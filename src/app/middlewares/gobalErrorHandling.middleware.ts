import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import config from '../../config';
import { ApiError } from '../../shared/errors/errors.clsses';
import { handleValidationError } from '../../shared/errors/errors.handlers';
import { IGenericErrorMessage } from '../../shared/errors/errors.interfaces';

export const globalErrorHandling = (
  err: Error | mongoose.Error.ValidationError | typeof ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];
  let stack: string | never[] | undefined = [];

  if (err instanceof mongoose.Error.ValidationError) {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
    stack = config.env !== 'production' ? err?.stack : [];
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack,
  });

  next(err);
};
