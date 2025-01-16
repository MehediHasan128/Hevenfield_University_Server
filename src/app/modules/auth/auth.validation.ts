import { z } from "zod"

const userLoginValidationSchema = z.object({
    body: z.object({
        email: z.string().optional(),
        password: z.string()
    })
})

export const AuthValidation = {
    userLoginValidationSchema
}