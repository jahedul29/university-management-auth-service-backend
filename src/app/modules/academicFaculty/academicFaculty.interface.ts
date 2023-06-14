import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
};

export type IAcademicFacultyMethods = object;

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  object,
  IAcademicFacultyMethods
>;

export type IAcademicFacultyFilters = {
  searchTerm?: string;
  title?: string;
};
