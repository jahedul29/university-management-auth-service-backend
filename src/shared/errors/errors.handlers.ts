import mongoose from 'mongoose';
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from './errors.interfaces';

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(el => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });
  return {
    statusCode: 400,
    message: err.message,
    errorMessages: errors,
  };
};
