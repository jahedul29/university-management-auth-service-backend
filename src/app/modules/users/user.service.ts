import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import config from '../../../config';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { UserRoles } from '../../../shared/enums';
import { ApiError } from '../../../shared/errors/errors.clsses';
import {
  IPaginatedResponse,
  IPaginationParams,
} from '../../../shared/interfaces';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { userSearchableFields } from './user.constants';
import { IUser, IUserFilters } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  user.role = UserRoles.STUDENT;

  if (!user?.password) {
    user.password = config.default_student_password as string;
  }

  let finalUser = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const academicSemester = await AcademicSemester.findById(
      student.academicSemester
    );

    if (!academicSemester) {
      throw new ApiError(httpStatus.NOT_FOUND, 'academic semester not found');
    }

    const generatedId = await generateStudentId(academicSemester);
    user.id = generatedId;
    student.id = generatedId;

    if (!generatedId) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to get id');
    }

    const savedStudent = await Student.create([student], { session });

    if (!savedStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    user.student = savedStudent[0]._id;
    const savedUser = await User.create([user], { session });

    if (!savedUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    finalUser = savedUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (finalUser) {
    finalUser = await User.findOne({ id: finalUser.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }

  return finalUser;
};

const getAllUsers = async (
  filters: IUserFilters,
  paginationParams: IPaginationParams
): Promise<IPaginatedResponse<IUser[]>> => {
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
  const searchableFields: string[] = userSearchableFields;

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

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const userData = await User.findById(id).populate({
    path: 'student',
    populate: [
      { path: 'academicSemester' },
      { path: 'academicFaculty' },
      { path: 'academicDepartment' },
    ],
  });
  return userData;
};

export const UserService = {
  createStudent,
  getAllUsers,
  getSingleUser,
};
