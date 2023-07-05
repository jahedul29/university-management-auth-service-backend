import express from 'express';
import { authorize } from '../../middlewares/authorize.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthZodValidation } from './auth.validation';

const authRouter = express.Router();

authRouter.post(
  '/login',
  validateRequest(AuthZodValidation.loginValidation),
  AuthController.login
);

authRouter.post(
  '/refresh-token',
  validateRequest(AuthZodValidation.refreshTokenValidation),
  AuthController.refreshToken
);

authRouter.patch(
  '/change-password',
  validateRequest(AuthZodValidation.changePasswordValidation),
  authorize([]),
  AuthController.changePassword
);

export const AuthRouter = authRouter;
