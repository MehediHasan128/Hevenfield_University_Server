import catchAsync from "../../utils/catchAsync";
import sendResponce from "../../utils/sendResponce";
import { AcademicSchoolServices } from "./academicSchool.services";

const createAcademicSchool = catchAsync(async(req, res) => {

    const data = await AcademicSchoolServices.createAcademicSchoolIntoDB(req.body);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Academic school is created successfully',
        data: data
    })
});


const getAllAcademicSchool = catchAsync(async(req, res) => {

    const data = await AcademicSchoolServices.getAllAcademicSchoolFromDB();

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Academic school retrive successfully',
        data: data
    })
});

export const AcademicSchoolController = {
    createAcademicSchool,
    getAllAcademicSchool
}

