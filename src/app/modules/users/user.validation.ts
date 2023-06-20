import { z } from 'zod';
import { bloodGroupList, gendersList } from '../../../shared/constants';
import { facultyDesignations } from '../faculty/faculty.constants';

// request validation
export const createUserZodSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),
      student: z.object({
        name: z.object({
          firstName: z.string({
            required_error: 'firstName is required',
          }),
          middleName: z.string().optional(),
          lastName: z.string({
            required_error: 'firstName is required',
          }),
        }),
        gender: z.enum([...gendersList] as [string, ...string[]], {
          required_error: 'gender is required',
        }),
        dateOfBirth: z.string({
          required_error: 'dateOfBirth is required',
        }),
        email: z
          .string({
            required_error: 'email is required',
          })
          .email({
            message: 'Invalid email address',
          }),
        contactNo: z.string({
          required_error: 'contactNo is required',
        }),
        emergencyContactNo: z.string({
          required_error: 'emergencyContactNo is required',
        }),
        bloodGroup: z
          .enum([...bloodGroupList] as [string, ...string[]])
          .optional(),
        presentAddress: z.string({
          required_error: 'presentAddress is required',
        }),
        permanentAddress: z.string({
          required_error: 'permanentAddress is required',
        }),
        guardian: z.object({
          fatherName: z.string({
            required_error: 'fatherName is required',
          }),
          fatherContactNo: z.string({
            required_error: 'fatherContactNo is required',
          }),
          fatherOccupation: z.string({
            required_error: 'fatherOccupation is required',
          }),
          motherName: z.string({
            required_error: 'motherName is required',
          }),
          motherContactNo: z.string({
            required_error: 'motherContactNo is required',
          }),
          motherOccupation: z.string({
            required_error: 'motherOccupation is required',
          }),
          address: z.string({
            required_error: 'address is required',
          }),
        }),
        localGuardian: z.object({
          name: z.string({
            required_error: 'name is required',
          }),
          contactNo: z.string({
            required_error: 'contactNo is required',
          }),
          occupation: z.string({
            required_error: 'occupation is required',
          }),
          address: z.string({
            required_error: 'address is required',
          }),
        }),
        academicFaculty: z.string({
          required_error: 'academicFaculty is required',
        }),
        academicSemester: z.string({
          required_error: 'academicSemester is required',
        }),
        academicDepartment: z.string({
          required_error: 'academicDepartment is required',
        }),
        profileImage: z.string().optional(),
      }),
      faculty: z.object({
        name: z.object({
          firstName: z.string({
            required_error: 'firstName is required',
          }),
          middleName: z.string().optional(),
          lastName: z.string({
            required_error: 'firstName is required',
          }),
        }),
        gender: z.enum([...gendersList] as [string, ...string[]], {
          required_error: 'gender is required',
        }),
        dateOfBirth: z.string({
          required_error: 'dateOfBirth is required',
        }),
        email: z
          .string({
            required_error: 'email is required',
          })
          .email({
            message: 'Invalid email address',
          }),
        contactNo: z.string({
          required_error: 'contactNo is required',
        }),
        emergencyContactNo: z.string({
          required_error: 'emergencyContactNo is required',
        }),
        bloodGroup: z
          .enum([...bloodGroupList] as [string, ...string[]])
          .optional(),
        presentAddress: z.string({
          required_error: 'presentAddress is required',
        }),
        permanentAddress: z.string({
          required_error: 'permanentAddress is required',
        }),
        designation: z.enum([...facultyDesignations] as [string, ...string[]], {
          required_error: 'designation is required',
        }),
        academicDepartment: z.string({
          required_error: 'academicDepartment is required',
        }),

        academicFaculty: z.string({
          required_error: 'academicFaculty is required',
        }),

        profileImage: z.string().optional(),
      }),
    })
    .partial()
    .refine(({ student, faculty }) => student || faculty, {
      message: 'student or faculty required',
    }),
});
