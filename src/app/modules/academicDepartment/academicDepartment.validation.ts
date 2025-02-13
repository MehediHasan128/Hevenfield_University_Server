import { z } from 'zod';

const createAcdemicDepartmentValidationSchema = z.object({
  body: z.object({
    academicSchool: z.string(),
    departmentName: z.string().nonempty('Department name is required.'),
    departmentCode: z
      .string()
      .regex(
        /^[A-Za-z0-9]+$/,
        'Department code must be alphanumeric with no spaces.',
      )
      .nonempty('Department code is required.'),
      addmission_fees: z.number({required_error: 'Addmission fees is required'}),
      total_credits: z.number({required_error: 'Total creadits is required'}),
      credit_cost: z.number({required_error: 'Credit cost is required'}),
  }),
});

export const AcademicDepartmentValidation = {
  createAcdemicDepartmentValidationSchema,
};
