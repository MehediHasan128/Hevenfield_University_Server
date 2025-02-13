import { Types } from "mongoose"

export type TAcademicDepartment = {
    academicSchool: Types.ObjectId;
    departmentName: string;
    departmentCode: string;
    departmentHead?: Types.ObjectId;
    addmission_fees: number;
    total_credits: number;
    credit_cost: number;
    isDeleted: boolean;
}