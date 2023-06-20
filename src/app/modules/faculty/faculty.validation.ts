import { z } from 'zod';
import { bloodGroupList, gendersList } from '../../../shared/constants';
import { facultyDesignations } from './faculty.constants';

// request validation
export const updateFacultyZodSchema = z.object({
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
    designation: z
      .enum([...facultyDesignations] as [string, ...string[]])
      .optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});
