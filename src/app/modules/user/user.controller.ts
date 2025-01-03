import catchAsync from "../../utils/catchAsync";
import sendResponce from "../../utils/sendResponce";
import { UserServices } from "./user.services";

const createStudent = catchAsync(async(req, res) => {

    const {password, studentData} = req.body;

    const data = await UserServices.createStudentIntoDB(password, studentData);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Student is created successfully',
        data: data
    })
});

export const UserController = {
    createStudent
}