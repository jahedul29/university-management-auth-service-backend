import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from './user.model';

const getLastStudentId = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne({ role: 'student' })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id ? lastUser.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester
): Promise<string> => {
  const currentId = await getLastStudentId();
  const newRoll = currentId ? parseInt(currentId) + 1 : 1;
  const studentId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${newRoll.toString().padStart(5, '0')}`;
  console.log({ newRoll, currentId });
  return studentId;
};

const getLastFacultyId = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne({ role: 'faculty' })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id ? lastUser.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId = await getLastFacultyId();
  const newRoll = currentId ? parseInt(currentId) + 1 : 1;
  const facultyId = `F-${newRoll.toString().padStart(5, '0')}`;
  console.log({ newRoll, currentId });
  return facultyId;
};
