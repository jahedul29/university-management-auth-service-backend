import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { UserService } from './user.service';
import { generateUserId } from './user.utils';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  user.password = user.email;
  const lastUserId = await UserService.getLastUserId();
  user.id = generateUserId(lastUserId, user.role);
  const savedUser = await UserService.saveUserToDb(user);
  res.status(200).json({
    success: true,
    message: 'User saved successfully',
    data: savedUser,
  });
});

export const UserController = {
  createUser,
};
