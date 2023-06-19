import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/constants';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
import { sendResponse } from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constants';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pickQueryParams(req.query, studentFilterableFields);
    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const result = await StudentService.getAllStudents(
      filters,
      paginationParams
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All students retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleStudent: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await StudentService.getSingleStudent(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student retrieved successfully',
      data: result,
    });
  }
);

const updateStudent: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;

    const result = await StudentService.updateStudent(id, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student data retrieved successfully',
      data: result,
    });
  }
);

const deleteStudent: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await StudentService.deleteStudent(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student deleted successfully',
      data: result,
    });
  }
);

export const StudentController = {
  getSingleStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
};
