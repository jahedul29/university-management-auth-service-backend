import { Response } from 'express';

type IApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string | null;
  data?: T | null;
};

export const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};
