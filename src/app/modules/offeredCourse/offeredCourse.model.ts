import { model, Schema } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";
import { days } from "./offeredCourse.constant";

const createOfferedCourseSchema = new Schema<TOfferedCourse>({
    semesterRegistration: { 
        type: Schema.Types.ObjectId, 
        ref: "SemesterRegistration", 
        required: [true, "Semester registration is required"] 
    },
    academicSemester: { 
        type: Schema.Types.ObjectId, 
        ref: "AcademicSemester", 
        required: [true, "Academic semester is required"] 
    },
    academicSchool: { 
        type: Schema.Types.ObjectId, 
        ref: "AcademicSchool", 
        required: [true, "Academic faculty is required"] 
    },
    academicDepartment: { 
        type: Schema.Types.ObjectId, 
        ref: "AcademicDepartment", 
        required: [true, "Academic department is required"] 
    },
    course: { 
        type: Schema.Types.ObjectId, 
        ref: "Course", 
        required: [true, "Course is required"] 
    },
    faculty: { 
        type: Schema.Types.ObjectId, 
        ref: "Faculty", 
        required: [true, "Faculty is required"] 
    },
    section: { 
        type: String, 
        required: [true, "Section is required"] 
    },
    studentCapacity: { 
        type: Number, 
        required: [true, "Student capacity is required"] 
    },
    classSchedule: [
        { 
            type: String,
            enum: days,
            required: [true, "Class schedule is required"] 
        }
    ],
    startTime: { 
        type: String, 
        required: [true, "Start time is required"] 
    },
    endTime: { 
        type: String, 
        required: [true, "End time is required"] 
    }
}, {timestamps: true});


export const OfferedCourse = model<TOfferedCourse>('OfferedCourse', createOfferedCourseSchema);