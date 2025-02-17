/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../config";
import httpStatus from 'http-status';
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "../modules/user/user.model";
import { NextFunction, Request, Response } from "express"
import { TUserRole } from "../modules/user/user.interface";

const Auth = (...requiredRole: TUserRole[]) => {
    return catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        // Check the token is send from the client
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized person');
        }

        // Decoded the user token
        let decoded
        try{
            decoded = jwt.verify(
                token,
                config.jwt_access_secret_token as string
            ) as JwtPayload;
        }catch(error){
            throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized person');
        }

        const {userEmail, userRole} = decoded;

        // Check the user is exists on database
        const isUserExists = await User.findOne({email: userEmail}).select('-password');
        if(!isUserExists){
            throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
        }

        // Check the user role is correct or not
        if(requiredRole && !requiredRole.includes(userRole)){
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are unauthorized person',
              );
        }

        req.user = decoded;

        next();
    })
};

export default Auth;