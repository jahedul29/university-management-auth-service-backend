import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { updateAdminValidationZodSchema } from './admin.validation';

const adminRouter = express.Router();

adminRouter.get('/', AdminController.getAllAdmins);
adminRouter.get('/:id', AdminController.getSingleAdmin);

adminRouter.patch(
  '/:id',
  validateRequest(updateAdminValidationZodSchema),
  AdminController.updateAdmin
);

adminRouter.delete('/:id', AdminController.deleteAdmin);

export const AdminRouter = adminRouter;
