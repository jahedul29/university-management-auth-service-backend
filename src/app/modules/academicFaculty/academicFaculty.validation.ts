import { z } from 'zod';

// request validation
export const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'role is required',
    }),
  }),
});

export const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});
