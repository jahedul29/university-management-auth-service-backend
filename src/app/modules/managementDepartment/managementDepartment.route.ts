import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
} from './managementDepartment.validation';

const managementDepartmentRouter = express.Router();

managementDepartmentRouter.get(
  '/',
  ManagementDepartmentController.getAllManagementDepartments
);
managementDepartmentRouter.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);

managementDepartmentRouter.patch(
  '/:id',
  validateRequest(updateManagementDepartmentZodSchema),
  ManagementDepartmentController.updateManagementDepartment
);

managementDepartmentRouter.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartment
);

managementDepartmentRouter.post(
  '/create-management-department',
  validateRequest(createManagementDepartmentZodSchema),
  ManagementDepartmentController.createManagementDepartment
);

export const ManagementDepartmentRouter = managementDepartmentRouter;
