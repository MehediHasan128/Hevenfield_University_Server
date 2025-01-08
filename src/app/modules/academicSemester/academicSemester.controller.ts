import catchAsync from "../../utils/catchAsync";
import sendResponce from "../../utils/sendResponce";
import { AcademicSemesterServices } from "./academicSemester.services";

const createAcademicSemester = catchAsync(async(req, res) => {

    const data = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Academic semester is created successfully',
        data: data
    })
});

export const AcademicSemesterController = {
    createAcademicSemester
}