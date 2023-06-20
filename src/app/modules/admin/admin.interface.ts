import { Model, Types } from 'mongoose';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface';

export type IUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type IAdmin = {
  id: string;
  name: IUserName;
  gender?: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: IBloodGroup;
  presentAddress?: string;
  permanentAddress?: string;
  profileImage?: string;
  managementDepartment: Types.ObjectId | IManagementDepartment;
  designation: string;
};

export type IAdminMethods = object;

export type IAdminModel = Model<IAdmin, object, IAdminMethods>;

export type IAdminFilter = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
