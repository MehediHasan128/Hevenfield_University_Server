import { z } from 'zod';

const createAcademicSchoolValidationSchema = z.object({
  body: z.object({
    schoolName: z.string().nonempty('School name is required.'),
    schoolCode: z.string().nonempty('School code is required.'),
  }),
});

export const AcademicSchoolValidation = {
  createAcademicSchoolValidationSchema,
};
