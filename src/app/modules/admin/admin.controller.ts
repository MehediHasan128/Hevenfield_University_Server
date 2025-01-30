import catchAsync from "../../utils/catchAsync";
import sendResponce from "../../utils/sendResponce";
import { AdminServices } from "./admin.services";

const getAllAdmin = catchAsync(async(req, res) => {

    const data = await AdminServices.getAllAdminFromDB(req.query);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Get all admin successfully',
        data: data
    });
});


const getSingleAdmin = catchAsync(async(req, res) => {

    const data = await AdminServices.getSingleAdminFromDB(req.params.adminId);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Get this admin successfully',
        data: data
    });
});


const updateAdmin = catchAsync(async(req, res) => {
    const data = await AdminServices.updateAdminIntoDB(req.params.adminId, req.body.admin);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Successfully update admin',
        data: data
    });
});


const deleteAdmin = catchAsync(async(req, res) => {
    const data = await AdminServices.deleteAdminFromDb(req.params.adminId);

    sendResponce(res, {
        success: true,
        statusCode: 200,
        message: 'Successfully delete this admin',
        data: data
    });
});

export const AdminController = {
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin
}