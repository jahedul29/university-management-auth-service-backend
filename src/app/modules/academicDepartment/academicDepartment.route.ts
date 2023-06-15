import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
} from './academicDepartment.validation';

const academicDepartmentRouter = express.Router();

academicDepartmentRouter.get(
  '/',
  AcademicDepartmentController.getAllDepartments
);
academicDepartmentRouter.get(
  '/:id',
  AcademicDepartmentController.getSingleDepartment
);
academicDepartmentRouter.patch(
  '/:id',
  validateRequest(updateAcademicDepartmentZodSchema),
  AcademicDepartmentController.updateDepartment
);
academicDepartmentRouter.delete(
  '/:id',
  AcademicDepartmentController.deleteDepartment
);
academicDepartmentRouter.post(
  '/create-department',
  validateRequest(createAcademicDepartmentZodSchema),
  AcademicDepartmentController.createAcademicDepartment
);

export const AcademicDepartmentRouter = academicDepartmentRouter;
