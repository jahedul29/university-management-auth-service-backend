import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/constants';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
import { sendResponse } from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constants';
import { FacultyService } from './faculty.service';

const getAllFaculties = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pickQueryParams(req.query, facultyFilterableFields);
    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const result = await FacultyService.getAllFaculties(
      filters,
      paginationParams
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All faculties retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleFaculty: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await FacultyService.getSingleFaculty(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculty retrieved successfully',
      data: result,
    });
  }
);

const updateFaculty: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;

    const result = await FacultyService.updateFaculty(id, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculty data updated successfully',
      data: result,
    });
  }
);

const deleteFaculty: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await FacultyService.deleteFaculty(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculty deleted successfully',
      data: result,
    });
  }
);

export const FacultyController = {
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
  getAllFaculties,
};
