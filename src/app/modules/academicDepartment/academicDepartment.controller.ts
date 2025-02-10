import catchAsync from "../../utils/catchAsync";
import sendResponce from "../../utils/sendResponce";
import { AcademicDepartmentServices } from "./academicDepartment.services";

const createAcademicDepartment = catchAsync(async(req, res) => {

    const data = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Academic department is created successfully',
        data: data
    })
});


const getAllAcademicDepartment = catchAsync(async(req, res) => {

    const data = await AcademicDepartmentServices.getAllACademicDepartmentFromDB(req.query);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Academic department is retrive successfully',
        data: data
    })
});

export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartment
}