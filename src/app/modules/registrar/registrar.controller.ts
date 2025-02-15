import catchAsync from "../../utils/catchAsync";
import sendResponce from "../../utils/sendResponce";
import { RegistrarServices } from "./registrar.services";

const getAllRegistrar = catchAsync(async(req, res) => {

    const data = await RegistrarServices.getAllRegistrarFromDB(req.query);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Get all registrar successfully',
        data: data
    });
});

const getSingleRegistrar = catchAsync(async(req, res) => {

    const data = await RegistrarServices.getSingleRegistrarFromDB(req.params.registrarId);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Get registrar successfully',
        data: data
    });
});

export const RegistrarController = {
    getAllRegistrar,
    getSingleRegistrar
}