import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const login = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const loginData = req.body;

    const result = await AuthService.login(loginData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Logged in successfully',
      data: result,
    });
  }
);

export const AuthController = {
  login,
};
