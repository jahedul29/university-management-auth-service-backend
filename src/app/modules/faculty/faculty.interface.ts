import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

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

export type IFaculty = {
  id: string;
  name: IUserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: IBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  designation:
    | 'chairman'
    | 'professor'
    | 'lecturer'
    | 'coordinator'
    | 'associate professor'
    | 'assistant professor'
    | 'adjunct';
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  profileImage?: string;
};

export type IFacultyMethods = object;

export type IFacultyModel = Model<IFaculty, object, IFacultyMethods>;

export type IFacultyFilter = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
