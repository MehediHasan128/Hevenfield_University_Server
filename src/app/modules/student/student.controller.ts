import catchAsync from "../../utils/catchAsync";
import sendResponce from "../../utils/sendResponce";
import { StudentServices } from "./student.services";

const getAllStudent = catchAsync(async(req, res) => {

    const data = await StudentServices.getAllStudentFromDB(req.query);    

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Get all student successfully',
        data: data
    });
});


export const StudentController = {
    getAllStudent
}