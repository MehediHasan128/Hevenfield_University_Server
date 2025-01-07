import { Types } from "mongoose"

export type TAcademicDepartment = {
    academicFaculty: Types.ObjectId;
    departmentName: string;
    departmentCode: string;
}