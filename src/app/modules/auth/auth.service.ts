import httpStatus from 'http-status';
import { ApiError } from '../../../shared/errors/errors.clsses';
import User from '../users/user.model';
import { ILoginUser } from './auth.interface';

const login = async (payload: ILoginUser) => {
  const { id, password } = payload;

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!(await User.isPasswordMatch(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password not match');
  }
};

export const AuthService = {
  login,
};
