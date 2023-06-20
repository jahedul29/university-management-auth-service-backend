import { z } from 'zod';

// request validation
export const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

export const updateManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .optional(),
  }),
});
