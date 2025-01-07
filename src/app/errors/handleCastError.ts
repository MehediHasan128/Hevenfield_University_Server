import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponce } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponce => {

    const errorSource: TErrorSource = [{
        path: err?.path,
        message: err?.message
    }];

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid Id',
        errorSource
    }

};

export default handleCastError;