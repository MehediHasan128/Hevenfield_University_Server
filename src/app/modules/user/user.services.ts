import { startSession } from "mongoose";
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';
import { Student } from "../student/student.model";
import calculateWaiver from "../../utils/calculateWaiver";

const createStudentIntoDB = async(password: string, payload: TStudent) => {
    
    // Create a user object
    const userData: Partial<TUser> = {};

    // Set student id from payload
    userData.id = payload.id;

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

    // total discount
    const discount = payload.totalCost * (waiver/100);
    // Set total cost
    payload.totalCost = payload.totalCost - discount;

    
    // User transaction rollback functionality

    // Start a session
    const session = await startSession();

    try{
        // Start a session
        session.startTransaction();

        // Create a user (transaction-1)
        const newUser = await User.create([userData], {session});
        
        if(!newUser.length){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }

        payload.id = newUser[0].id;
        payload.userId = newUser[0]._id;

        // Create a student (transaction-2)
        const newStudent = await Student.create([payload], {session});

        if(!newStudent){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
        }

        await session.commitTransaction();
        await session.endSession();
    }catch(err){
        console.log(err);
        await session.abortTransaction();
        await session.endSession();
    }
};

export const UserServices = {
    createStudentIntoDB
}