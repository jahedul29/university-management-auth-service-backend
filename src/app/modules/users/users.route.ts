import express from 'express';
import { createUser } from './users.controller';

const userRouter = express.Router();

userRouter.post('/create-user', createUser);

export default userRouter;
