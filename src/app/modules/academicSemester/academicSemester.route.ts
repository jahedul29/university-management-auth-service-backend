import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSeemester.controller';
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from './academicSemester.validation';

const academicSemesterRouter = express.Router();

academicSemesterRouter.get(
  '/:id',
  AcademicSemesterController.getSingleSemester
);

academicSemesterRouter.patch(
  '/:id',
  validateRequest(updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

academicSemesterRouter.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRouter = academicSemesterRouter;
