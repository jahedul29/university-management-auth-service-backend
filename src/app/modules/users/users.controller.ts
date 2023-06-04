import { NextFunction, Request, Response } from 'express';
import { getLastUserId, saveUserToDb } from './users.service';
import { generateUserId } from './users.utils';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    user.password = user.email;
    const lastUserId = await getLastUserId();
    user.id = generateUserId(lastUserId, user.role);
    const savedUser = await saveUserToDb(user);
    res.status(200).json({
      success: true,
      message: 'User saved successfully',
      data: savedUser,
    });
  } catch (error) {
    next(error);
  }
};
