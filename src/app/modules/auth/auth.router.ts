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

authRouter.post(
  '/refresh-token',
  validateRequest(AuthZodValidation.refreshTokenValidation),
  AuthController.refreshToken
);

export const AuthRouter = authRouter;
