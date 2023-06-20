import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { ApiError } from '../../../shared/errors/errors.clsses';
import {
  IPaginatedResponse,
  IPaginationParams,
} from '../../../shared/interfaces';
import User from '../users/user.model';
import { studentSearchableFields } from './student.constants';
import { IStudent, IStudentFilter } from './student.interface';
import { Student } from './student.model';

const getAllStudents = async (
  filters: IStudentFilter,
  paginationParams: IPaginationParams
): Promise<IPaginatedResponse<IStudent[]>> => {
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
  const searchableFields: string[] = studentSearchableFields;

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

  const result = await Student.find(filterCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id);
  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const { name, guardian, localGuardian, ...studentData } = payload;

  const updatedStudentData = studentData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const keyName = `name.${key}`;
      (updatedStudentData as any)[keyName] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const keyName = `guardian.${key}`;
      (updatedStudentData as any)[keyName] =
        guardian[key as keyof typeof guardian];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const keyName = `guardian.${key}`;
      (updatedStudentData as any)[keyName] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate(
    { _id: id },
    updatedStudentData,
    {
      new: true,
    }
  );

  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  // TODO://Need to delete user also

  const student = await Student.findById(id);

  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  let deletedStudent = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const user = await User.findOne({ id: student.id });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    deletedStudent = await Student.findOneAndDelete({ _id: id }, { session });
    await User.findOneAndDelete({ id: user.id }, { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return deletedStudent;
};

export const StudentService = {
  getSingleStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
};
