import express from 'express';
import { UserRoles } from '../../../shared/enums';
import { authorize } from '../../middlewares/authorize.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
} from './managementDepartment.validation';

const managementDepartmentRouter = express.Router();

managementDepartmentRouter.get(
  '/',
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  ManagementDepartmentController.getAllManagementDepartments
);
managementDepartmentRouter.get(
  '/:id',
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  ManagementDepartmentController.getSingleManagementDepartment
);

managementDepartmentRouter.patch(
  '/:id',
  validateRequest(updateManagementDepartmentZodSchema),
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  ManagementDepartmentController.updateManagementDepartment
);

managementDepartmentRouter.delete(
  '/:id',
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  ManagementDepartmentController.deleteManagementDepartment
);

managementDepartmentRouter.post(
  '/create-management-department',
  validateRequest(createManagementDepartmentZodSchema),
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  ManagementDepartmentController.createManagementDepartment
);

export const ManagementDepartmentRouter = managementDepartmentRouter;
