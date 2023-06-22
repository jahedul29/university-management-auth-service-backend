import express from 'express';
import { UserRoles } from '../../../shared/enums';
import { authorize } from '../../middlewares/authorize.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
} from './academicFaculty.validation';

const academicFacultyRouter = express.Router();

academicFacultyRouter.get(
  '/',
  authorize([]),
  AcademicFacultyController.getAllFaculties
);

academicFacultyRouter.get(
  '/:id',
  authorize([]),
  AcademicFacultyController.getSingleFaculty
);

academicFacultyRouter.patch(
  '/:id',
  validateRequest(updateAcademicFacultyZodSchema),
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  AcademicFacultyController.updateFaculty
);

academicFacultyRouter.delete(
  '/:id',
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  AcademicFacultyController.deleteFaculty
);

academicFacultyRouter.post(
  '/create-faculty',
  validateRequest(createAcademicFacultyZodSchema),
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  AcademicFacultyController.createAcademicFaculty
);

export const AcademicFacultyRouter = academicFacultyRouter;
