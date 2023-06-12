import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemestereController } from './academicSeemester.controller';
import { createAcademicSemesterZodSchema } from './academicSemester.validation';

const academicSemesterRouter = express.Router();

academicSemesterRouter.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  AcademicSemestereController.createAcademicSemester
);

export const AcademicSemesterRouter = academicSemesterRouter;
