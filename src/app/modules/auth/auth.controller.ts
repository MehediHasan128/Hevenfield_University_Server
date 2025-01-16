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

export const AuthController = {
    userLogin
}