import { z } from 'zod';
import { userNameValidationSchema } from '../user/user.validation';

const guardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNumber: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNumber: z.string().optional(),
});

const localGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNumber: z.string().optional(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string({ invalid_type_error: 'Password must be string' })
      .min(6, 'Password must be at least 6 characters long')
      .max(15, 'Password cant not more than 15 characters')
      .optional(),
    student: z.object({
      userName: userNameValidationSchema,
      email: z.string({ required_error: 'Email is required.' }).email({
        message: 'Invalid email address.',
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required.',
        invalid_type_error: 'Invalid gender.',
      }),
      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required.',
        })
        .refine((value) => !isNaN(Date.parse(value)), {
          message: 'Invalid date format.',
        }),
      contactNumber: z.string({
        required_error: 'Contact number is required.',
      }),
      emergencyContactNumber: z.string({
        required_error: 'Emergency contact number is required.',
      }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
          invalid_type_error: 'Invalid blood group.',
        })
        .optional(),
      presentAddress: z.string({
        required_error: 'Present address is required.',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required.',
      }),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      sscRoll: z.string({
        required_error: 'SSC roll is required.',
      }),
      sscResult: z.number({
        required_error: 'SSC result is required.',
      }),
      hscRoll: z.string({
        required_error: 'HSC roll is required.',
      }),
      hscResult: z.number({
        required_error: 'HSC result is required.',
      }),
      addmissionSemester: z.string({
        required_error: 'Admission semester is required.',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required.',
      }),
      addmissionFee: z.number({
        required_error: 'Admission fee is required.',
      }),
      totalCredits: z.number({
        required_error: 'Total credits are required.',
      }),
      totalCost: z.number({
        required_error: 'Total cost is required.',
      }),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const StudentValidation = {
  createStudentValidationSchema,
};
