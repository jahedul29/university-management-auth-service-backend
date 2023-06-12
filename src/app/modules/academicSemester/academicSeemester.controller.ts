import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { ApiError } from '../../../shared/errors/errors.clsses';
import { sendResponse } from '../../../shared/sendResponse';
import { academicSemesterTitleCodeMapper } from './academicSemester.constants';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const academicSemeester = req.body;

    if (
      academicSemesterTitleCodeMapper[academicSemeester.title] !==
      academicSemeester.code
    ) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
    }

    const savedData = await AcademicSemesterService.saveSemesterToDB(
      academicSemeester
    );

    next();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester saved successfully',
      data: savedData,
    });
  }
);

export const AcademicSemestereController = {
  createAcademicSemester,
};
