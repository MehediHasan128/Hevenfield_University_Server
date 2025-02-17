import { Types } from "mongoose"
import { TDays } from "./offeredCourse.constant";

export type TOfferedCourse = {
    semesterRegistration: Types.ObjectId;
    academicSemester: Types.ObjectId;
    academicSchool: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    course: Types.ObjectId;
    faculty: Types.ObjectId;
    section: string;
    studentCapacity: number;
    classSchedule: TDays[];
    startTime: string;
    endTime: string;
}