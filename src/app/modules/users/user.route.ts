import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import {
  createAdminZodSchema,
  createFacultyZodSchema,
  createStudentZodSchema,
} from './user.validation';

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getSingleUser);
userRouter.post(
  '/create-student',
  validateRequest(createStudentZodSchema),
  UserController.createStudent
);
userRouter.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  UserController.createFaculty
);
userRouter.post(
  '/create-admin',
  validateRequest(createAdminZodSchema),
  UserController.createAdmin
);

export const UserRouters = userRouter;
