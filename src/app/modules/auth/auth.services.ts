import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TUserLogin, TUserToken } from "./auth.interface";
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../config";
import { createToken } from "./auth.utils";

const loginUser = async(payload: TUserLogin) => {

    // check if the user is exist on database
    const isUserExist = await User.findOne({email: payload.email});
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    };
    // Check the user is delete or not
    const isUserDeleted = isUserExist?.isDeleted;
    if(isUserDeleted === true){
        throw new AppError(httpStatus.FORBIDDEN, 'User is already delete!');
    };
    // Check the user status
    const userStatus = isUserExist?.status;
    if(userStatus === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
    };


    // Check the user password is correct or not
    const isPasswordMatch = await bcrypt.compare(payload?.password, isUserExist?.password);
    if(!isPasswordMatch){
        throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect Password!');
    };


    // If the password is correct then create a user token;
    const jwtPayload: TUserToken = {
        userEmail: isUserExist?.email,
        userId: isUserExist?.id,
        userRole: isUserExist?.role
    };
    // Create jwt token
    const accessToken = createToken(jwtPayload, config.jwt_access_secret_token as string, config.jwt_access_expires_in as string);

    
    return {
        accessToken,
        needsPasswordChange: isUserExist?.needPasswordChange
    }
}

export const AuthServices = {
    loginUser
}