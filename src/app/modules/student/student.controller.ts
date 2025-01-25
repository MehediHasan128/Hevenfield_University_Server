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

const getSingleStudent = catchAsync(async(req, res) => {

    const {studentId} = req.params;

    const data = await StudentServices.getSingleStudentFromDB(studentId);    

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Get student successfully',
        data: data
    });
});

const updateStudent = catchAsync(async(req, res) => {

    const {studentId} = req.params;
    const updateData = req.body.student;

    const data = await StudentServices.updateStudentIntoDB(studentId, updateData);    

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Student information is updated successfully',
        data: data
    });
});


export const StudentController = {
    getAllStudent,
    getSingleStudent,
    updateStudent
}