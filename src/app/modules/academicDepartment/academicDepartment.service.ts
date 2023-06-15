import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import {
  IPaginatedResponse,
  IPaginationParams,
} from '../../../shared/interfaces';
import { academicDepartmentSearchableFields } from './academicDepartment.constants';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const createDepartment = async (
  academicDepartment: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const savedData = await AcademicDepartment.create(academicDepartment);
  return savedData;
};

const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationParams: IPaginationParams
): Promise<IPaginatedResponse<IAcademicDepartment[]>> => {
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
  const searchableFields: string[] = academicDepartmentSearchableFields;

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

  const result = await AcademicDepartment.find(filterCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const savedData = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return savedData;
};

const updateDepartment = async (
  id: string,
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const savedData = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  ).populate('academicFaculty');
  return savedData;
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const savedData = await AcademicDepartment.findByIdAndDelete(id);
  return savedData;
};

export const AcademicDepartmentService = {
  createDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartments,
};
