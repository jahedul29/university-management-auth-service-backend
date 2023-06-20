import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/constants';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
import { sendResponse } from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constants';
import { AdminService } from './admin.service';

const getAllAdmins = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pickQueryParams(req.query, adminFilterableFields);
    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const result = await AdminService.getAllAdmins(filters, paginationParams);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All admins retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleAdmin: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await AdminService.getSingleAdmin(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin retrieved successfully',
      data: result,
    });
  }
);

const updateAdmin: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;

    const result = await AdminService.updateAdmin(id, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin data updated successfully',
      data: result,
    });
  }
);

const deleteAdmin: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await AdminService.deleteAdmin(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin deleted successfully',
      data: result,
    });
  }
);

export const AdminController = {
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
};
