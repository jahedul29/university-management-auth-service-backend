import { Model } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
};

export type IUserMethods = object;

export type UserModel = Model<IUser, object, IUserMethods>;

export type IUserFilters = {
  searchTerm?: string;
};
