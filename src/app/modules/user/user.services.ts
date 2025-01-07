import { startSession } from "mongoose";
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async(password: string, payload: TStudent) => {

    console.log(payload, password);
    
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
    
    // User transaction rollback functionality

    // Start a session
    const session = await startSession();

    try{
        // Start a session
        session.startTransaction();

        const newUser = await User.create([userData], {session});
        console.log(newUser);

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