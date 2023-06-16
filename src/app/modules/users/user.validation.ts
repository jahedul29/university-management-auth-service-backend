import { z } from 'zod';

// request validation
export const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    // email: z
    //   .string({
    //     required_error: 'email is required',
    //   })
    //   .email({
    //     message: 'Invalid email address',
    //   }),
    password: z.string().optional(),
  }),
});
