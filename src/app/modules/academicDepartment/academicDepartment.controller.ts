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

export const AcademicDepartmentController = {
    createAcademicDepartment
}