import express, { Router } from 'express';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { UserRouters } from '../modules/users/user.route';

const appRouter = express.Router();

const routes = [
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouter,
  },
];

routes.forEach((element: { path: string; route: Router }) => {
  appRouter.use(element.path, element.route);
});

export default appRouter;
