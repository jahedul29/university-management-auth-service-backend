import mongoose from 'mongoose';
import { IUser } from './user.interface';
import User from './user.model';

const getLastUserId = async (): Promise<string> => {
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

const saveUserToDb = async (user: IUser): Promise<IUser | null> => {
  const savedUser = await User.create(user);
  return savedUser;
};

export const UserService = {
  getLastUserId,
  saveUserToDb,
};
