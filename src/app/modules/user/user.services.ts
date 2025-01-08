import config from "../../config";
import { User } from "./user.model";
import httpStatus from 'http-status';
import { TUser } from "./user.interface";
import AppError from "../../errors/AppError";
import { startSession, Types } from "mongoose";
import { generateStudentId } from "./user.utils";
import { Student } from "../student/student.model";
import { TStudent } from "../student/student.interface";
import calculateWaiver from "../../utils/calculateWaiver";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { getDepartmentCostInformation } from "../../utils/getDepartmentCostInformation";

const createStudentIntoDB = async(password: string, payload: TStudent) => {
    
    // Create a user object
    const userData: Partial<TUser> = {};

    // Set student id
    const studenId = await generateStudentId(payload.addmissionSemester as Types.ObjectId, payload.academicDepartment as Types.ObjectId);
    userData.id = studenId;

    // Set user email from payload
    userData.email = payload.email;

    // id password is not given use default passwprd
    userData.password = password || (config.student_default_pass as string);

    // Set user role
    userData.role = 'student';

    // Calculate student waiver
    const waiver = calculateWaiver(payload.sscResult, payload.hscResult);
    // Set waiver
    payload.waiver = `${waiver}%`;

    
    // get department name
    const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment, {_id: 0, departmentName: 1});

    // Get department cost information
    const departmentCostInformation = getDepartmentCostInformation(academicDepartment?.departmentName as string);
    const { credits, creditCost, addmissionCost } = departmentCostInformation;

    // Set addmission fees
    payload.addmissionFee = addmissionCost;

    // Set total creadits
    payload.totalCredits = credits;

    // User transaction rollback functionality

    // Start a session
    // const session = await startSession();

    // try{
    //     // Start a session
    //     session.startTransaction();

    //     // Create a user (transaction-1)
    //     const newUser = await User.create([userData], {session});
        
    //     if(!newUser.length){
    //         throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    //     }

    //     payload.id = newUser[0].id;
    //     payload.userId = newUser[0]._id;

    //     // Create a student (transaction-2)
    //     const newStudent = await Student.create([payload], {session});

    //     if(!newStudent){
    //         throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    //     }

    //     await session.commitTransaction();
    //     await session.endSession();

    //     return newStudent;
    // }catch(err){
    //     console.log(err);
    //     await session.abortTransaction();
    //     await session.endSession();
    // }
};

export const UserServices = {
    createStudentIntoDB
}