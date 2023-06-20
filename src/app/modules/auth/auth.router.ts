import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthZodValidation } from './auth.validation';

const authRouter = express.Router();

authRouter.post(
  '/login',
  validateRequest(AuthZodValidation.loginValidation),
  AuthController.login
);

export const AuthRouter = authRouter;
