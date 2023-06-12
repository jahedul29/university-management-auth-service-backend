import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { generateUserId } from './user.utils';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    user.password = user.email;
    const lastUserId = await UserService.getLastUserId();
    user.id = generateUserId(lastUserId, user.role);
    const savedUser = await UserService.saveUserToDb(user);

    next();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User saved successfully',
      data: savedUser,
    });
  }
);

export const UserController = {
  createUser,
};
