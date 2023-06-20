import { Model } from 'mongoose';

export type IManagementDepartment = {
  title: string;
};

export type IManagementDepartmentMethods = object;

export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  object,
  IManagementDepartmentMethods
>;

export type IManagementDepartmentFilters = {
  searchTerm?: string;
  title?: string;
};
