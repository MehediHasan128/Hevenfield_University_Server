import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorResponce } from "../interface/error";

const handelZodError = (err: ZodError): TGenericErrorResponce => {

    const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue?.path.length - 1],
            message: issue?.message
        }
    });

    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorSource
    }

};

export default handelZodError;