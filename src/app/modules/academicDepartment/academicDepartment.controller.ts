import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/constants';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
import { sendResponse } from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constants';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const academicDepartment = req.body;

    const savedData = await AcademicDepartmentService.createDepartment(
      academicDepartment
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department saved successfully',
      data: savedData,
    });
  }
);

const getAllDepartments = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pickQueryParams(
      req.query,
      academicDepartmentFilterableFields
    );
    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const result = await AcademicDepartmentService.getAllDepartments(
      filters,
      paginationParams
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All academic faculties retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleDepartment: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await AcademicDepartmentService.getSingleDepartment(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department retrieved successfully',
      data: result,
    });
  }
);

const updateDepartment: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;

    const result = await AcademicDepartmentService.updateDepartment(
      id,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department updated successfully',
      data: result,
    });
  }
);

const deleteDepartment: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await AcademicDepartmentService.deleteDepartment(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department deleted successfully',
      data: result,
    });
  }
);

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartments,
};
