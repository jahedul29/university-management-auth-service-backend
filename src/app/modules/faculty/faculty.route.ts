import express from 'express';
import { UserRoles } from '../../../shared/enums';
import { authorize } from '../../middlewares/authorize.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { updateFacultyZodSchema } from './faculty.validation';

const facultyRouter = express.Router();

facultyRouter.get('/', authorize([]), FacultyController.getAllFaculties);
facultyRouter.get('/:id', authorize([]), FacultyController.getSingleFaculty);

facultyRouter.patch(
  '/:id',
  validateRequest(updateFacultyZodSchema),
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.FACULTY]),
  FacultyController.updateFaculty
);

facultyRouter.delete(
  '/:id',
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  FacultyController.deleteFaculty
);

export const FacultyRouter = facultyRouter;
