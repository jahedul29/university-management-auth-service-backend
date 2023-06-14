import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createSemester = async (
  academicSemester: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  const savedData = await AcademicSemester.create(academicSemester);
  return savedData;
};

export const AcademicSemesterService = {
  createSemester,
};
