import { z } from "zod";

export const userNameValidationSchema = z.object({
    firstName: z.string({
      required_error: 'First name is required.',
    }),
    middleName: z.string().optional(),
    lastName: z.string({
      required_error: 'Last name is required.',
    }),
  });

const userValidationSchema = z.object({
    password: z.string({invalid_type_error: "Password must be string"}).min(8, "Password must be at least 8 characters long").max(20, "Password cant not more than 20 characters").optional(),
});

export const UserValidation = {
    userValidationSchema
}