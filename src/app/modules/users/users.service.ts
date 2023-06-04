import mongoose from 'mongoose';
import { IUser } from './users.interface';
import User from './users.model';

export const getLastUserId = async (): Promise<string> => {
  const collectionExists =
    mongoose.connection.readyState === 1 &&
    mongoose.connection.collections.user;
  if (collectionExists) {
    const lastUser = await User.find().sort({ createdAt: -1 }).lean();
    return lastUser[0].id;
  } else {
    return '';
  }
};

export const saveUserToDb = async (user: IUser): Promise<IUser | null> => {
  const savedUser = await User.create(user);
  return savedUser;
};
