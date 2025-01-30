import { z } from 'zod';
import { userNameValidationSchema } from '../user/user.validation';

const createAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      // Personal Information
      userName: userNameValidationSchema,
      email: z
        .string()
        .min(1, 'Email is required.')
        .email('Invalid email format.'),
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: 'Gender must be either male or female.' }),
      }),
      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required.',
        })
        .refine((value) => !isNaN(Date.parse(value)), {
          message: 'Invalid date format.',
        }),
        contactNumber: z.string().min(1, 'Contact number is required.'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
          message: 'Invalid blood group',
        })
        .optional(),
      dateOfJoining: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: 'Invalid date of joining',
        }),

      // Address Info
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),

      // Department Info
      menegingDepartment: z
        .string()
        .min(1, { message: 'Managing department is required' }),
    }),
  }),
});

export const AdminValidation = {
    createAdminValidationSchema
};
