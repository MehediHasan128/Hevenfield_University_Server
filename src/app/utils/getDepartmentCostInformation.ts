import { DepartmentCostInformation } from "../constant/departmentCostInformation"

export const getDepartmentCostInformation = (departmentName: string) => {
    const credits = DepartmentCostInformation[departmentName].total_credits;
    const creditCost = DepartmentCostInformation[departmentName].credits_cost;
    const addmissionCost = DepartmentCostInformation[departmentName].addmission_fees;

    return {
        credits,
        creditCost,
        addmissionCost
    }
}