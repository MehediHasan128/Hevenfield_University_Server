import catchAsync from "../../utils/catchAsync";
import sendResponce from "../../utils/sendResponce";
import { UserServices } from "./user.services";

const createStudent = catchAsync(async(req, res) => {

    const {password, student: studentData} = req.body;

    const data = await UserServices.createStudentIntoDB(req.file, password, studentData);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Student is created successfully',
        data: data
    })
});


const createFaculty = catchAsync(async(req, res) => {

    const {password, faculty: facultyData} = req.body;

    const data = await UserServices.createFacultyIntoDB(password, facultyData);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Faculty is created successfully',
        data: data
    })
});

export const UserController = {
    createStudent,
    createFaculty
}