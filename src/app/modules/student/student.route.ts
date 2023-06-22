import express from 'express';
import { UserRoles } from '../../../shared/enums';
import { authorize } from '../../middlewares/authorize.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { updateStudentZodSchema } from './student.validation';

const studentRouter = express.Router();

studentRouter.get(
  '/',
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.FACULTY]),
  StudentController.getAllStudents
);
studentRouter.get(
  '/:id',
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.FACULTY]),
  StudentController.getSingleStudent
);

studentRouter.patch(
  '/:id',
  validateRequest(updateStudentZodSchema),
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.STUDENT]),
  StudentController.updateStudent
);

studentRouter.delete(
  '/:id',
  authorize([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]),
  StudentController.deleteStudent
);

export const StudentRouter = studentRouter;
