import express, { Router } from 'express';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { AdminRouter } from '../modules/admin/admin.route';
import { FacultyRouter } from '../modules/faculty/faculty.route';
import { ManagementDepartmentRouter } from '../modules/managementDepartment/managementDepartment.route';
import { StudentRouter } from '../modules/student/student.route';
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
  {
    path: '/academic-departments',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRouter,
  },
  {
    path: '/students',
    route: StudentRouter,
  },
  {
    path: '/faculties',
    route: FacultyRouter,
  },
  {
    path: '/admins',
    route: AdminRouter,
  },
];

routes.forEach((element: { path: string; route: Router }) => {
  appRouter.use(element.path, element.route);
});

export default appRouter;
