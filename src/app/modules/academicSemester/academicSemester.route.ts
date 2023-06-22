import express from 'express';
import { UserRoles } from '../../../shared/enums';
import { authorize } from '../../middlewares/authorize.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSeemester.controller';
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from './academicSemester.validation';

const academicSemesterRouter = express.Router();

academicSemesterRouter.get(
  '/',
  authorize([]),
  AcademicSemesterController.getAllSemesters
);

academicSemesterRouter.get(
  '/:id',
  authorize([]),
  AcademicSemesterController.getSingleSemester
);

academicSemesterRouter.patch(
  '/:id',
  validateRequest(updateAcademicSemesterZodSchema),
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  AcademicSemesterController.updateSemester
);

academicSemesterRouter.delete(
  '/:id',
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  AcademicSemesterController.deleteSemester
);

academicSemesterRouter.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRouter = academicSemesterRouter;
