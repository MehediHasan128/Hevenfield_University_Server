import { z } from 'zod';
import { userNameValidationSchema } from '../user/user.validation';
import { addressValidationSchema } from '../../constant';

const createRegistrarValidationSchema = z.object({
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
      presentAddress: addressValidationSchema,
      permanentAddress: addressValidationSchema,
    }),
  }),
});

const updateRegistrarValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      // Personal Information
      userName: userNameValidationSchema.optional(),
      email: z
        .string()
        .min(1, 'Email is required.')
        .email('Invalid email format.').optional(),
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: 'Gender must be either male or female.' }),
      }).optional(),
      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required.',
        })
        .refine((value) => !isNaN(Date.parse(value)), {
          message: 'Invalid date format.',
        }).optional(),
        contactNumber: z.string().min(1, 'Contact number is required.').optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
          message: 'Invalid blood group',
        })
        .optional(),
      dateOfJoining: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: 'Invalid date of joining',
        }).optional(),

      // Address Info
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }).optional(),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }).optional(),

      // Department Info
      menegingDepartment: z
        .string()
        .min(1, { message: 'Managing department is required' }).optional(),
    }),
  }),
});

export const RegistrarValidation = {
    createRegistrarValidationSchema,
    updateRegistrarValidationSchema
};
