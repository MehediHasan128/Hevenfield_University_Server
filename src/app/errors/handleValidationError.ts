import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponce } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponce => {
    const errorSource: TErrorSource = Object.values(err.errors).map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: value?.path,
            message: value?.message
        }
    });

    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorSource
    }
};

export default handleValidationError;