import catchAsync from "../../utils/catchAsync";
import sendResponce from "../../utils/sendResponce";
import { AuthServices } from "./auth.services";

const userLogin = catchAsync(async(req, res) => {

    const data = await AuthServices.loginUser(req.body);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'User logged in successfully',
        data: data
    })
});


const changePassword = catchAsync(async(req, res) => {

    const data = await AuthServices.changeUserPassword(req.user, req.body);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Password update successfully',
        data: data
    })
});

export const AuthController = {
    userLogin,
    changePassword
}