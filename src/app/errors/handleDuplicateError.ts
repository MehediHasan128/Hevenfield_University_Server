import { TErrorSource } from "../interface/error";

/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (err: any) => {

    const match = err.errorResponse.errmsg.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];

    const errorSource: TErrorSource = [{
        path: '',
        message: `${extractedMessage} is already exists`
    }];

    const statusCode = 400;

    return {
        statusCode,
        message: '',
        errorSource
    }

};

export default handleDuplicateError;