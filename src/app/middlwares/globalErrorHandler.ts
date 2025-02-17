/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../config";
import { ZodError } from "zod";
import AppError from "../errors/AppError";
import { TErrorSource } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import handleCastError from "../errors/handleCastError";
import { NextFunction, Request, Response } from "express";
import handleValidationError from "../errors/handleValidationError";
import handleDuplicateError from "../errors/handleDuplicateError";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    let message = "Something went wrong";
    let errorSources: TErrorSource = [{
        path: '',
        message: 'Something went wrong'
    }];

    if(err instanceof ZodError){
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSource;
    }else if(err?.name === 'ValidationError'){
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSource;
    }else if(err?.name === 'CastError'){
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSource;
    }else if(err?.code === 11000){
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSource;
    }else if(err instanceof AppError){
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [{
            path: '',
            message: err?.message
        }]
    }else if(err instanceof Error){
        message = err.message;
        errorSources = [{
            path: '',
            message: err.message
        }]

    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: (config.node_env === 'development')? err?.stack : null
    })
}

export default globalErrorHandler;