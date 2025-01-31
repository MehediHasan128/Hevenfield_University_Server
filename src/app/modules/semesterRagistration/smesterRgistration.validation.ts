import { z } from 'zod';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().nonempty('Academic semester is required.'),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
    startDate: z.coerce.date({ required_error: 'Start date is required.' }),
    endDate: z.coerce.date({ required_error: 'End date is required.' }),
    minCredits: z.number().min(12, 'Minimum credits must be at least 12.'),
    maxCredits: z.number().max(22, 'Maximum credits must be at least 22.'),
  }),
});

export const SemesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
};
