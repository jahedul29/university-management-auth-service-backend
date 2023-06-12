import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const saveSemesterToDB = async (
  academicSemester: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  const savedData = await AcademicSemester.create(academicSemester);
  return savedData;
};

export const AcademicSemesterService = {
  saveSemesterToDB,
};
