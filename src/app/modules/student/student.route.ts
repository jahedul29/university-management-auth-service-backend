import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { updateStudentZodSchema } from './student.validation';

const studentRouter = express.Router();

studentRouter.get('/', StudentController.getAllStudents);
studentRouter.get('/:id', StudentController.getSingleStudent);

studentRouter.patch(
  '/:id',
  validateRequest(updateStudentZodSchema),
  StudentController.updateStudent
);

studentRouter.delete('/:id', StudentController.deleteStudent);

export const StudentRouter = studentRouter;
