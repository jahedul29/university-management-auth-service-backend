import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { ApiError } from '../../../shared/errors/errors.clsses';
import { academicSemesterTitleCodeMapper } from './academicSemester.constants';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
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
    res.status(200).json({
      success: true,
      message: 'Academic semester saved successfully',
      data: savedData,
    });
  }
);

export const AcademicSemestereController = {
  createAcademicSemester,
};
