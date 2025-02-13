import { Types } from "mongoose";
import { AcademicDepartment } from "../modules/academicDepartment/academicDepartment.model";

export type TDepartmentData = {
    addmission_fees: number;
    total_credits: number;
    credit_cost: number;
}

export const getDepartmentCostInformation = async(departmentId: Types.ObjectId) => {
    const departmentData = await AcademicDepartment.findById(departmentId, {_id: 0, addmission_fees: 1, total_credits: 1, credit_cost: 1});
    return departmentData
}