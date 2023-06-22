import express from 'express';
import { UserRoles } from '../../../shared/enums';
import { authorize } from '../../middlewares/authorize.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
} from './academicDepartment.validation';

const academicDepartmentRouter = express.Router();

academicDepartmentRouter.get(
  '/',
  authorize([]),
  AcademicDepartmentController.getAllDepartments
);
academicDepartmentRouter.get(
  '/:id',
  authorize([]),
  AcademicDepartmentController.getSingleDepartment
);
academicDepartmentRouter.patch(
  '/:id',
  validateRequest(updateAcademicDepartmentZodSchema),
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  AcademicDepartmentController.updateDepartment
);
academicDepartmentRouter.delete(
  '/:id',
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  AcademicDepartmentController.deleteDepartment
);
academicDepartmentRouter.post(
  '/create-department',
  validateRequest(createAcademicDepartmentZodSchema),
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  AcademicDepartmentController.createAcademicDepartment
);

export const AcademicDepartmentRouter = academicDepartmentRouter;
