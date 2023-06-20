import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { updateFacultyZodSchema } from './faculty.validation';

const facultyRouter = express.Router();

facultyRouter.get('/', FacultyController.getAllFaculties);
facultyRouter.get('/:id', FacultyController.getSingleFaculty);

facultyRouter.patch(
  '/:id',
  validateRequest(updateFacultyZodSchema),
  FacultyController.updateFaculty
);

facultyRouter.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRouter = facultyRouter;
