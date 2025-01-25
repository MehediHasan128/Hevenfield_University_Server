import config from "../../config";
import { AuthServices } from "./auth.services";
import catchAsync from "../../utils/catchAsync";
import sendResponce from "../../utils/sendResponce";

const userLogin = catchAsync(async(req, res) => {

    const data = await AuthServices.loginUser(req.body);

    const {accessToken, refreshToken, needsPasswordChange} = data;

    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true
    })

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'User logged in successfully',
        data: {
            accessToken,
            needsPasswordChange
        }
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


const forgetPassword = catchAsync(async(req, res) => {

    const data = await AuthServices.forgetUserPassword(req.body.email);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Your password reset link genereted successfully',
        data: data
    })
});


const resetPassword = catchAsync(async(req, res) => {

    const resetPasswordData = req.body;
    const resetToken = req.headers.authorization;

    const data = await AuthServices.resetUserPassword(resetPasswordData, resetToken as string);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Your password successfully update',
        data: data
    })
});


const userRefreshToken = catchAsync(async(req, res) => {
    const refreshToken = req.cookies.refreshToken;

    const data = await AuthServices.refreshToken(refreshToken);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Access token is retrieved successfully',
        data: data
    })
})

export const AuthController = {
    userLogin,
    changePassword,
    forgetPassword,
    resetPassword,
    userRefreshToken
}