import { z } from "zod"

const userLoginValidationSchema = z.object({
    body: z.object({
        email: z.string().optional(),
        password: z.string()
    })
});

const changeUserPassword = z.object({
    body: z.object({
        oldPassword: z.string(),
        newPassword: z.string(),
    })
});

const forgetPasswordValidationSchema = z.object({
    body: z.object({
        email: z.string()
    })
})

export const AuthValidation = {
    userLoginValidationSchema,
    changeUserPassword,
    forgetPasswordValidationSchema
}