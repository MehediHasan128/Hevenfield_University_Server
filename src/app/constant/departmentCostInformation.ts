type DepartmentInfo = {
    [key: string]: number
}

export type TDepartmentCost = {
    [key: string]: DepartmentInfo
}

export const DepartmentCostInformation: TDepartmentCost = {
    "Computer Science": {
        "total_credits": 150,
        "credits_cost": 2500,
        "addmission_fees": 7500
    },
    "Civil Engineering": {
        "total_credits": 130,
        "credits_cost": 2070,
        "addmission_fees": 10500
    },
}