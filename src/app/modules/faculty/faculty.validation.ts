import { z } from 'zod';
import { userNameValidationSchema } from '../user/user.validation';

const educationalBackgroundValidationSchema = z.array(
  z.object({
    degree: z.string().min(1, { message: 'Degree is required' }),
    university: z.string().min(1, { message: 'University is required' }),
    yearOfGraduation: z
      .string()
      .min(1, { message: 'Year of graduation is required' })
      .regex(/^\d{4}$/, {
        message: 'Year of graduation must be a valid 4-digit year',
      }),
    specialization: z
      .string()
      .min(1, { message: 'Specialization is required' }),
  }),
);

const professionalExperienceValidationSchema = z.array(
  z.object({
    role: z.string().min(1, { message: 'Role is required' }),
    institution: z.string().min(1, { message: 'Institution is required' }),
    duration: z.string().min(1, { message: 'Duration is required' }),
    responsibilities: z
      .string()
      .min(1, { message: 'Responsibilities are required' }),
  }),
);

const recommendationLetterValidationSchema = z.array(
  z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    designation: z.string().min(1, { message: 'Designation is required' }),
    institution: z.string().min(1, { message: 'Institution is required' }),
    contactEmail: z.string().email({ message: 'Invalid email format' }),
  }),
);

const sampleWorkPortfolioValidationSchema = z.array(
  z.object({
    type: z.string().min(1, { message: 'Type is required' }),
    url: z.string().url({ message: 'Invalid URL format' }),
  }),
);

const referenceValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  designation: z.string().min(1, { message: 'Designation is required' }),
  institution: z.string().min(1, { message: 'Institution is required' }),
  contactNumber: z.string().min(1, { message: 'Contact number is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
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
          invalid_type_error: 'Invalid blood group.',
        })
        .optional(),

      // Address Info
      presentAddress: z.string().min(1, 'Present address is required.'),
      permanentAddress: z.string().min(1, 'Permanent address is required.'),

      // Educational Background
      educationalBackground: educationalBackgroundValidationSchema,

      // Professional Experience
      professionalExperience: professionalExperienceValidationSchema.optional(),

      // Skills and Certifications
      skillsAndCertifications: z.array(z.string()).optional(),

      // Sample Work Portfolio
      sampleWorkPortfolio: sampleWorkPortfolioValidationSchema.optional(),

      // Recommendation Letters
      recommendationLetters: recommendationLetterValidationSchema.optional(),

      // Awards and Achievements
      awardsAndAchievements: z.array(z.string()).optional(),

      // Reference
      reference: referenceValidationSchema,
      academicDepartment: z.string()
    }),
  }),
});



const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
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
          invalid_type_error: 'Invalid blood group.',
        })
        .optional(),

      // Address Info
      presentAddress: z.string().min(1, 'Present address is required.').optional(),
      permanentAddress: z.string().min(1, 'Permanent address is required.').optional(),

      // Educational Background
      educationalBackground: educationalBackgroundValidationSchema.optional(),

      // Professional Experience
      professionalExperience: professionalExperienceValidationSchema.optional(),

      // Skills and Certifications
      skillsAndCertifications: z.array(z.string()).optional(),

      // Sample Work Portfolio
      sampleWorkPortfolio: sampleWorkPortfolioValidationSchema.optional(),

      // Recommendation Letters
      recommendationLetters: recommendationLetterValidationSchema.optional(),

      // Awards and Achievements
      awardsAndAchievements: z.array(z.string()).optional(),

      // Reference
      reference: referenceValidationSchema.optional()
    }),
  }),
});

export const FacultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema
};
