import { z } from 'zod';
import { Months, SemesterName } from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    semesterName: z.enum([...SemesterName] as [string, ...string[]]),
    year: z
      .string()
      .regex(/^\d{4}$/, { message: 'Year must be a valid 4-digit year.' })
      .nonempty({ message: 'Year is required.' }),
      startMonth: z.enum([...Months] as [string, ...string[]]),
      endMonth: z.enum([...Months] as [string, ...string[]])
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
};
