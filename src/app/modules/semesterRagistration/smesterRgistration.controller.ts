import catchAsync from "../../utils/catchAsync";
import sendResponce from "../../utils/sendResponce";
import { SemesterRegistrationServices } from "./smesterRgistration.services";

const createSemesterRegistration = catchAsync(async(req, res) => {

    const data = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Successfully added semester registration',
        data: data
    });
});


const getAllSemesterRegistration = catchAsync(async(req, res) => {

    const data = await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Retrive all student semester registration',
        data: data
    });
});


const getSingleSemesterRegistration = catchAsync(async(req, res) => {

    const data = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(req.params.semesterRegistrationId);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Retrive single semester registration',
        data: data
    });
});


const updateSemesterRegistration = catchAsync(async(req, res) => {
    console.log(8);
    const data = await SemesterRegistrationServices.updateSingleSemesterRegistrationIntoDB();
    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Successfully update semester registration',
        data: data
    });
});




export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}