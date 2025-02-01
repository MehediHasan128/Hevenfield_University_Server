import { z } from "zod";

const createPreRequisiteCourseSchema = z.object({
    course: z.string()
})


const createCourseValidationSchema = z.object({
    body: z.object({
        courseTitle: z.string().min(1, "Course title is required"),
        prefix: z.string().min(1, "Course prefix is required"),
        code: z.string().min(1, "Course code is required"),
        credits: z.number().min(1, "Credits must be at least 1"),
        preRequisiteCourse: z.array(createPreRequisiteCourseSchema).optional()
    })
});


export const CourseValidations = {
    createCourseValidationSchema,
}