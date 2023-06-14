/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/constants';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
import { sendResponse } from '../../../shared/sendResponse';
import { userFilterableFields } from './user.constants';
import { UserService } from './user.service';
import { generateUserId } from './user.utils';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    user.password = user.email;
    const lastUserId = await UserService.getLastUserId();
    user.id = generateUserId(lastUserId, user.role);
    const savedUser = await UserService.saveUserToDb(user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User saved successfully',
      data: savedUser,
    });

    next();
  }
);

const getAllUsers = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pickQueryParams(req.query, userFilterableFields);
    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const result = await UserService.getAllUsers(filters, paginationParams);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User saved successfully',
      data: result.data,
      meta: result.meta,
    });

    // next();
  }
);

const getSingleUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await UserService.getSingleUser(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User retrieved successfully',
      data: result,
    });
  }
);

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
};
