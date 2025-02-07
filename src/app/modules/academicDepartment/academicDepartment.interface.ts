import { Types } from "mongoose"

export type TAcademicDepartment = {
    academicSchool: Types.ObjectId;
    departmentName: string;
    departmentCode: string;
}