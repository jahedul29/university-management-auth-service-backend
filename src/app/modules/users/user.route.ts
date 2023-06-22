import express from 'express';
import { UserRoles } from '../../../shared/enums';
import { authorize } from '../../middlewares/authorize.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import {
  createAdminZodSchema,
  createFacultyZodSchema,
  createStudentZodSchema,
} from './user.validation';

const userRouter = express.Router();

userRouter.get(
  '/',
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  UserController.getAllUsers
);
userRouter.get(
  '/:id',
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  UserController.getSingleUser
);
userRouter.post(
  '/create-student',
  validateRequest(createStudentZodSchema),
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  UserController.createStudent
);
userRouter.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  UserController.createFaculty
);
userRouter.post(
  '/create-admin',
  validateRequest(createAdminZodSchema),
  authorize([UserRoles.SUPER_ADMIN]),
  UserController.createAdmin
);

export const UserRouters = userRouter;
