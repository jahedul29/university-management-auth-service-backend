/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model, Types } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needPasswordChange: boolean;
  passwordChangedAt?: Date;
  student?: Types.ObjectId;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
};

export type IUserMethods = object;

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<
    Pick<IUser, 'id' | 'password' | 'role' | 'needPasswordChange'>
  > | null;
  isPasswordMatch(
    givenPassword: string,
    userPassword: string
  ): Promise<boolean>;
} & Model<IUser, Record<string, never>, IUserMethods>;

export type IUserFilters = {
  searchTerm?: string;
  id?: string;
};
