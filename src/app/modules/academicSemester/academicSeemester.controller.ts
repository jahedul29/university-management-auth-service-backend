import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(
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

    next();
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

export const AcademicSemesterController = {
  createAcademicSemester,
  getSingleSemester,
  updateSemester,
};
