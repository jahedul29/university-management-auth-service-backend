import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSeemester.controller';
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from './academicSemester.validation';

const academicSemesterRouter = express.Router();

academicSemesterRouter.get('/', AcademicSemesterController.getAllSemesters);
academicSemesterRouter.get(
  '/:id',
  AcademicSemesterController.getSingleSemester
);

academicSemesterRouter.patch(
  '/:id',
  validateRequest(updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

academicSemesterRouter.delete(
  '/:id',
  AcademicSemesterController.deleteSemester
);

academicSemesterRouter.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRouter = academicSemesterRouter;
