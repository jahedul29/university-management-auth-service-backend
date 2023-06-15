import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type IAcademicDepartmentMethods = object;

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  object,
  IAcademicDepartmentMethods
>;

export type IAcademicDepartmentFilters = {
  searchTerm?: string;
  title?: string;
  academicFaculty?: string;
};
