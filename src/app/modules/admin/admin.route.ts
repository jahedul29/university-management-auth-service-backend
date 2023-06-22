import express from 'express';
import { UserRoles } from '../../../shared/enums';
import { authorize } from '../../middlewares/authorize.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { updateAdminValidationZodSchema } from './admin.validation';

const adminRouter = express.Router();

adminRouter.get(
  '/',
  authorize([UserRoles.SUPER_ADMIN]),
  AdminController.getAllAdmins
);
adminRouter.get(
  '/:id',
  authorize([UserRoles.SUPER_ADMIN]),
  AdminController.getSingleAdmin
);

adminRouter.patch(
  '/:id',
  validateRequest(updateAdminValidationZodSchema),
  authorize([UserRoles.SUPER_ADMIN]),
  AdminController.updateAdmin
);

adminRouter.delete(
  '/:id',
  authorize([UserRoles.SUPER_ADMIN]),
  AdminController.deleteAdmin
);

export const AdminRouter = adminRouter;
