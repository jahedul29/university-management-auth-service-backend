import mongoose, { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import {
  IPaginatedResponse,
  IPaginationParams,
} from '../../../shared/interfaces';
import { IUser, IUserFilters } from './user.interface';
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

const getAllUsers = async (
  filters: IUserFilters,
  paginationParams: IPaginationParams
): Promise<IPaginatedResponse<IUser[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.generatePaginationAndSortFeilds(paginationParams);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortBy) {
    sortCondition[sortBy] = sortOrder;
  }

  // working on searching
  const { searchTerm } = filters;
  const andConditions = [];
  let filterCondition = {};
  const searchableFields: string[] = ['email'];

  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map((field: string) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });

    filterCondition = { $and: andConditions };
  }

  const result = await User.find(filterCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const UserService = {
  getLastUserId,
  saveUserToDb,
  getAllUsers,
};
