import catchAsync from "../../utils/catchAsync";
import sendResponce from "../../utils/sendResponce";
import { FacultyServices } from "./faculty.services";

const getAllFaculty = catchAsync(async(req, res) => {

    const data = await FacultyServices.getAllFacultyFromDB(req.query);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Get all student successfully',
        data: data
    });
});


const getSingleFaculty = catchAsync(async(req, res) => {

    const data = await FacultyServices.getSingleFacultyFromDB(req.params.facultyId);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Get this faculty successfully',
        data: data
    });
});


const updateFaculty = catchAsync(async(req, res) => {
    console.log(8);
    const data = await FacultyServices.updateFacultyIntoDB(req.params.facultyId, req.body.faculty);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Successfully update faculty',
        data: data
    });
});


const deleteFaculty = catchAsync(async(req, res) => {
    const data = await FacultyServices.deleteFacultyFromDb(req.params.facultyId);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Successfully delete this faculty',
        data: data
    });
});

export const FacultyController = {
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty
}