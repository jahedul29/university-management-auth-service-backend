import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';

export type IUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IGuardian = {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
  address: string;
};

export type ILocalGuardian = {
  name: string;
  contactNo: string;
  occupation: string;
  address: string;
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

export type IStudent = {
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
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicSemester: Types.ObjectId | IAcademicSemester;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  profileImage?: string;
};

export type IStudentMethods = object;

export type IStudentModel = Model<IStudent, object, IStudentMethods>;

export type IStudentFilter = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
