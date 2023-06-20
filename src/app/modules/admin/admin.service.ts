import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { ApiError } from '../../../shared/errors/errors.clsses';
import {
  IPaginatedResponse,
  IPaginationParams,
} from '../../../shared/interfaces';
import User from '../users/user.model';
import { adminSearchableFields } from './admin.constants';
import { IAdmin, IAdminFilter } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdmins = async (
  filters: IAdminFilter,
  paginationParams: IPaginationParams
): Promise<IPaginatedResponse<IAdmin[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.generatePaginationAndSortFields(paginationParams);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortBy) {
    sortCondition[sortBy] = sortOrder;
  }

  // working on filtering
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  let filterCondition = {};
  const searchableFields: string[] = adminSearchableFields;

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

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });

    filterCondition = { $and: andConditions };
  }

  const result = await Admin.find(filterCondition)
    .populate('managementDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate('managementDepartment');
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const { name, ...adminData } = payload;

  const updatedAdminData = adminData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const keyName = `name.${key}`;
      (updatedAdminData as any)[keyName] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ _id: id }, updatedAdminData, {
    new: true,
  }).populate('managementDepartment');

  return result;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  // TODO://Need to delete user also

  const admin = await Admin.findById(id);

  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  let deletedAdmin = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const user = await User.findOne({ id: admin.id });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    deletedAdmin = await Admin.findOneAndDelete(
      { _id: id },
      { session }
    ).populate('managementDepartment');
    await User.findOneAndDelete({ id: user.id }, { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return deletedAdmin;
};

export const AdminService = {
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
};
