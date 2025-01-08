import { Types } from "mongoose";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { User } from "./user.model";

const findLastUser = async(userRole: string) => {
    const lastUser = await User.findOne({role: userRole}, {_id: 0, id: 1}).sort({createdAt: -1}).lean();

    return lastUser?.id? lastUser.id : undefined;
}

export const generateStudentId = async(semesterId: Types.ObjectId, departmentId: Types.ObjectId) => {
    const academicSemester = await AcademicSemester.findById(semesterId, {_id: 0, year: 1, semesterCode: 1});
    const academicDepartment = await AcademicDepartment.findById(departmentId, {_id: 0, departmentCode: 1});

    const currentStudentAddmissionYear = (academicSemester?.year)?.toString().slice(-2);
    const currentStudentAddmissionSemesterCode = academicSemester?.semesterCode;
    const currentStudentDepartmentCode = (academicDepartment?.departmentCode)?.toString().slice(-3);

    const lastStudentId = await findLastUser('student');
    const lastStudentAddmissionYear = lastStudentId?.substring(0, 2);
    const lastStudentAddmissionSemesterCode = lastStudentId?.substring(2, 4);
    const lastStudentDepartmentCode = lastStudentId?.substring(4, 7);

    let currentStudentId = (0).toString();

    if(lastStudentId && lastStudentAddmissionYear === currentStudentAddmissionYear && lastStudentAddmissionSemesterCode === currentStudentAddmissionSemesterCode && lastStudentDepartmentCode === currentStudentDepartmentCode){
        currentStudentId = lastStudentId?.substring(9);
    }

    let incrementId = (Number(currentStudentId) + 1).toString().padStart(3, '0');

    incrementId = `${currentStudentAddmissionYear}${currentStudentAddmissionSemesterCode}${currentStudentDepartmentCode}${incrementId}`;

    return incrementId
}


// 2501101001