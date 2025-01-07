import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    facultyName: z.string().nonempty('Faculty name is required.'),
    facultyCode: z.string().nonempty('Faculty code is required.'),
  }),
});

export const AcademicFacultyValidation = {
    createAcademicFacultyValidationSchema
}
