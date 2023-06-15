import { Model } from 'mongoose';

export type IAcademicSemesterTitle = 'Autumn' | 'Spring' | 'Fall';

export type IAcademicSemesterCode = '01' | '02' | '03';

export type IAcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemester = {
  title: IAcademicSemesterTitle;
  code: IAcademicSemesterCode;
  year: string;
  startMonth: IAcademicSemesterMonth;
  endMonth: IAcademicSemesterMonth;
};

export type IAcademicSemesterMethods = object;

export type AcademicSemesterModel = Model<
  IAcademicSemester,
  object,
  IAcademicSemesterMethods
>;

export type IAcademicSemesterFilters = {
  searchTerm?: string;
  title?: string;
  code?: string;
  year?: string;
};
