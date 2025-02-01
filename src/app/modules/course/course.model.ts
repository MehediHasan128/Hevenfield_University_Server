import { model, Schema } from "mongoose";
import { TCourse, TPreRequisiteCourse } from "./course.interface";


const PreRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
    course: {
        type: Schema.Types.ObjectId,
        ref: "course",
        required: [true, "Pre-requisite course ID is required"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
})


const CourseSchema = new Schema<TCourse>({
    courseTitle: {
        type: String,
        required: [true, "Course title is required"],
        trim: true,
    },
    prefix: {
        type: String,
        required: [true, "Course prefix is required"],
        trim: true,
    },
    code: {
        type: String,
        required: [true, "Course code is required"],
        trim: true,
    },
    courseCode: {
        type: String,
        required: [true, "Full course code is required"],
        unique: true,
        trim: true,
    },
    credits: {
        type: Number,
        required: [true, "Credits are required"],
        min: [1, "Credits must be at least 1"],
    },
    preRequisiteCourse: [PreRequisiteCourseSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});


export const Course = model<TCourse>('course', CourseSchema)