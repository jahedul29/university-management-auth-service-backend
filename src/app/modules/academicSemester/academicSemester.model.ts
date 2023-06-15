import status from 'http-status';
import { Schema, model } from 'mongoose';
import { ApiError } from '../../../shared/errors/errors.clsses';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constants';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: [...academicSemesterTitles],
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: [...academicSemesterCodes],
    },
    startMonth: {
      type: String,
      required: true,
      enum: [...academicSemesterMonths],
    },
    endMonth: {
      type: String,
      required: true,
      enum: [...academicSemesterMonths],
    },
  },
  { timestamps: true }
);

academicSemesterSchema.pre('save', async function (next) {
  const isDuplicate = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isDuplicate) {
    throw new ApiError(status.CONFLICT, 'Academic semester already exist');
  }
  next();
});

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);

export default AcademicSemester;
