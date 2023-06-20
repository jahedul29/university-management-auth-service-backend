import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/constants';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
import { sendResponse } from '../../../shared/sendResponse';
import { managementDepartmentFilterableFields } from './managementDepartment.constants';
import { ManagementDepartmentService } from './managementDepartment.service';

const createManagementDepartment: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const managementDepartment = req.body;

    const savedData =
      await ManagementDepartmentService.createManagementDepartment(
        managementDepartment
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Management department saved successfully',
      data: savedData,
    });
  }
);

const getAllManagementDepartments = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pickQueryParams(
      req.query,
      managementDepartmentFilterableFields
    );
    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationParams
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All Management department retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleManagementDepartment: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Management department retrieved successfully',
      data: result,
    });
  }
);

const updateManagementDepartment: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;

    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Management department updated successfully',
      data: result,
    });
  }
);

const deleteManagementDepartment: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Management department deleted successfully',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
  getAllManagementDepartments,
};
