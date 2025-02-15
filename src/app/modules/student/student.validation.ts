import { z } from 'zod';
import { userNameValidationSchema } from '../user/user.validation';
import { addressValidationSchema } from '../../constant';

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
    student: z.object({
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
      presentAddress: addressValidationSchema,
      permanentAddress: addressValidationSchema,
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
      isDeleted: z.boolean().optional(),
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      userName: userNameValidationSchema.optional(),
      email: z
        .string({ required_error: 'Email is required.' })
        .email({
          message: 'Invalid email address.',
        })
        .optional(),
      gender: z
        .enum(['male', 'female'], {
          required_error: 'Gender is required.',
          invalid_type_error: 'Invalid gender.',
        })
        .optional(),
      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required.',
        })
        .refine((value) => !isNaN(Date.parse(value)), {
          message: 'Invalid date format.',
        })
        .optional(),
      contactNumber: z
        .string({
          required_error: 'Contact number is required.',
        })
        .optional(),
      emergencyContactNumber: z
        .string({
          required_error: 'Emergency contact number is required.',
        })
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
          invalid_type_error: 'Invalid blood group.',
        })
        .optional(),
      presentAddress: z
        .string({
          required_error: 'Present address is required.',
        })
        .optional(),
      permanentAddress: z
        .string({
          required_error: 'Permanent address is required.',
        })
        .optional(),
      guardian: guardianValidationSchema.optional(),
      localGuardian: localGuardianValidationSchema.optional(),
      sscRoll: z
        .string({
          required_error: 'SSC roll is required.',
        })
        .optional(),
      sscResult: z
        .number({
          required_error: 'SSC result is required.',
        })
        .optional(),
      hscRoll: z
        .string({
          required_error: 'HSC roll is required.',
        })
        .optional(),
      hscResult: z
        .number({
          required_error: 'HSC result is required.',
        })
        .optional(),
      addmissionSemester: z
        .string({
          required_error: 'Admission semester is required.',
        })
        .optional(),
      academicDepartment: z
        .string({
          required_error: 'Academic department is required.',
        })
        .optional(),
      addmissionFee: z
        .number({
          required_error: 'Admission fee is required.',
        })
        .optional(),
      totalCredits: z
        .number({
          required_error: 'Total credits are required.',
        })
        .optional(),
      totalCost: z
        .number({
          required_error: 'Total cost is required.',
        })
        .optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const StudentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
