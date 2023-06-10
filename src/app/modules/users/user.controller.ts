import { RequestHandler } from 'express';
import { UserService } from './user.service';
import { generateUserId } from './user.utils';

const createUser: RequestHandler = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
};
