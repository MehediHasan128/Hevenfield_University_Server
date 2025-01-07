import catchAsync from "../../utils/catchAsync";
import sendResponce from "../../utils/sendResponce";
import { AcademicFacultyServices } from "./academicFaculty.services";

const createAcademicFaculty = catchAsync(async(req, res) => {

    const data = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Academic faculty is created successfully',
        data: data
    })
});

export const AcademicFacultyController = {
    createAcademicFaculty
}