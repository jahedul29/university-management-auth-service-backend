import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
} from './academicFaculty.validation';

const academicFacultyRouter = express.Router();

academicFacultyRouter.get('/', AcademicFacultyController.getAllFaculties);
academicFacultyRouter.get('/:id', AcademicFacultyController.getSingleFaculty);
academicFacultyRouter.patch(
  '/:id',
  validateRequest(updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFaculty
);
academicFacultyRouter.delete('/:id', AcademicFacultyController.deleteFaculty);
academicFacultyRouter.post(
  '/create-faculty',
  validateRequest(createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);

export const AcademicFacultyRouter = academicFacultyRouter;
