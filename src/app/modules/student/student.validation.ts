import { z } from 'zod';
import { bloodGroupList, gendersList } from '../../../shared/constants';

// request validation
export const updateStudentZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z.enum([...gendersList] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z.enum([...bloodGroupList] as [string, ...string[]]).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    guardian: z
      .object({
        fatherName: z.string().optional(),
        fatherContactNo: z.string().optional(),
        fatherOccupation: z.string().optional(),
        motherName: z.string().optional(),
        motherContactNo: z.string().optional(),
        motherOccupation: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    localGuardian: z
      .object({
        name: z.string().optional(),
        contactNo: z.string().optional(),
        occupation: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    academicFaculty: z.string().optional(),
    academicSemester: z.string().optional(),
    academicDepartment: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});
