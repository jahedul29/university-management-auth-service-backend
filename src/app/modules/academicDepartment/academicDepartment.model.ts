import httpStatus from 'http-status';
import mongoose, { Schema, model } from 'mongoose';
import { ApiError } from '../../../shared/errors/errors.clsses';
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  { timestamps: true }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({
    title: { $regex: new RegExp('^' + this.title + '$', 'i') },
    academicFaculty: this.academicFaculty,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'This department under this specific faculty exist!'
    );
  }
  next();
});

const AcademicDepartment = model<IAcademicDepartment, AcademicDepartmentModel>(
  'AcademicDepartment',
  academicDepartmentSchema
);

export default AcademicDepartment;
