import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { createUserZodSchema } from './user.validation';

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getSingleUser);
userRouter.post(
  '/create-user',
  validateRequest(createUserZodSchema),
  UserController.createUser
);

export const UserRouters = userRouter;
