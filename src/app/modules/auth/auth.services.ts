import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TChangePassword, TUserLogin, TUserToken } from "./auth.interface";
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from "../../config";
import { createToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";

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
};

const changeUserPassword = async(userData: JwtPayload, payload: TChangePassword) => {

    // check if the user is exist on database
    const isUserExist = await User.findOne({email: userData?.userEmail}, {_id: 0, password: 1});
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    }
    
    // Check the old password is correct or not
    const isOldPasswordIsCorrect = await bcrypt.compare(payload?.oldPassword, isUserExist?.password);
    if(!isOldPasswordIsCorrect){
        throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect Password!');
    }

    // If old password is correct then bcrypt the new password and update
    const newPassword = await bcrypt.hash(payload?.newPassword, Number(config.bcrypt_salt_round));

    await User.findOneAndUpdate({email: userData?.userEmail, role: userData?.userRole}, {password: newPassword, needPasswordChange: false, passwordChangeAt: new Date()}, {new: true}).select('-password');
}

export const AuthServices = {
    loginUser,
    changeUserPassword
}