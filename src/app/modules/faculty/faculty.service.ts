import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { ApiError } from '../../../shared/errors/errors.clsses';
import {
  IPaginatedResponse,
  IPaginationParams,
} from '../../../shared/interfaces';
import User from '../users/user.model';
import { facultySearchableFields } from './faculty.constants';
import { IFaculty, IFacultyFilter } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFaculties = async (
  filters: IFacultyFilter,
  paginationParams: IPaginationParams
): Promise<IPaginatedResponse<IFaculty[]>> => {
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
  const searchableFields: string[] = facultySearchableFields;

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

  const result = await Faculty.find(filterCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id);
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const { name, ...facultyData } = payload;

  const updatedFacultyData = facultyData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const keyName = `name.${key}`;
      (updatedFacultyData as any)[keyName] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate(
    { _id: id },
    updatedFacultyData,
    {
      new: true,
    }
  );

  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  // TODO://Need to delete user also

  const faculty = await Faculty.findById(id);

  if (!faculty) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  let deletedFaculty = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const user = await User.findOne({ id: faculty.id });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    deletedFaculty = await Faculty.findOneAndDelete({ _id: id }, { session });
    await User.findOneAndDelete({ id: user.id }, { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return deletedFaculty;
};

export const FacultyService = {
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
  getAllFaculties,
};
