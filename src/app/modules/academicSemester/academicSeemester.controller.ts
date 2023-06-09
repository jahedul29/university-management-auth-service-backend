import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/constants';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
import { sendResponse } from '../../../shared/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constants';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const academicSemester = req.body;

    const savedData = await AcademicSemesterService.createSemester(
      academicSemester
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester saved successfully',
      data: savedData,
    });
  }
);

const getAllSemesters = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pickQueryParams(
      req.query,
      academicSemesterFilterableFields
    );
    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationParams
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All academic semesters retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleSemester: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await AcademicSemesterService.getSingleSemester(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester retrieved successfully',
      data: result,
    });
  }
);

const updateSemester: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;

    const result = await AcademicSemesterService.updateSemester(id, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester retrieved successfully',
      data: result,
    });
  }
);

const deleteSemester: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await AcademicSemesterService.deleteSemester(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester deleted successfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
  getAllSemesters,
};
