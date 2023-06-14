import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import {
  IPaginatedResponse,
  IPaginationParams,
} from '../../../shared/interfaces';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createFaculty = async (
  academicFaculty: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const savedData = await AcademicFaculty.create(academicFaculty);
  return savedData;
};

const getAllFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationParams: IPaginationParams
): Promise<IPaginatedResponse<IAcademicFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.generatePaginationAndSortFeilds(paginationParams);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortBy) {
    sortCondition[sortBy] = sortOrder;
  }

  // working on filtering
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  let filterCondition = {};
  const searchableFields: string[] = academicFacultyFilterableFields;

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

  const result = await AcademicFaculty.find(filterCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const savedData = await AcademicFaculty.findById(id);
  return savedData;
};

const updateFaculty = async (
  id: string,
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const savedData = await AcademicFaculty.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return savedData;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const savedData = await AcademicFaculty.findByIdAndDelete(id);
  return savedData;
};

export const AcademicFacultyService = {
  createFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
  getAllFaculties,
};
