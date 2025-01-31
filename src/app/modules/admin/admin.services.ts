import httpStatus from 'http-status'
import QueryBuilder from '../../buildre/QueryBuildre';
import { adminSearchableField } from './admin.constant';
import { Admin } from './admin.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import { TAdmin } from './admin.interface';
import { startSession } from 'mongoose';

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(adminSearchableField)
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await adminQuery.queryModel;
  return data;
};

const getSingleAdminFromDB = async (adminId: string) => {

    // Check if the faculty is exist or not
    const isExistsAdmin = await User.findOne({id: adminId, role: 'admin'});
    if(!isExistsAdmin){
        throw new AppError(httpStatus.BAD_REQUEST, 'Admin not found');
    };
    // Check the faculty is delete or not
    const isDeleteAdmin = isExistsAdmin?.isDeleted;
    if(isDeleteAdmin === true){
        throw new AppError(httpStatus.BAD_REQUEST, 'Admin is already deleted');
    };
    // Check the faculty status
    const adminStatus = isExistsAdmin?.status;
    if(adminStatus === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN, 'This admin is blocked');
    };

  const data = await Admin.findOne({ id: adminId });
  return data;
};

const updateAdminIntoDB = async(adminId: string, payload: Partial<TAdmin>) => {

    // Check if the faculty is exist or not
    const isExistsAdmin = await User.findOne({id: adminId, role: 'admin'});
    if(!isExistsAdmin){
        throw new AppError(httpStatus.BAD_REQUEST, 'Admin not found');
    };
    // Check the faculty is delete or not
    const isDeleteAdmin = isExistsAdmin?.isDeleted;
    if(isDeleteAdmin === true){
        throw new AppError(httpStatus.BAD_REQUEST, 'Admin is already deleted');
    };
    // Check the faculty status
    const adminStatus = isExistsAdmin?.status;
    if(adminStatus === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN, 'This admin is blocked');
    };

    // Update faculty
    const data = await Admin.findOneAndUpdate({id: adminId}, payload, {new: true});
    return data;
};

const deleteAdminFromDb = async(adminId: string) => {

    // Check if the faculty is exist or not
    const isExistsFaculty = await User.findOne({id: adminId, role: 'admin'});
    if(!isExistsFaculty){
        throw new AppError(httpStatus.BAD_REQUEST, 'Faculty not found');
    };
    // Check the faculty is delete or not
    const isDeleteFaculty = isExistsFaculty?.isDeleted;
    if(isDeleteFaculty === true){
        throw new AppError(httpStatus.BAD_REQUEST, 'Faculty is already deleted');
    };


    const session = await startSession();

    try {

        session.startTransaction();

        // fisrt delete faculty from faculty collection
        const deleteAdmin = await Admin.findOneAndUpdate({id: adminId}, {isDeleted: true}, {new: true, session});
        if(!deleteAdmin){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin')
        }

        // Now delete the user
        const deletUser = await User.findOneAndUpdate({id: adminId}, {isDeleted: true}, {new: true, session});
        if(!deletUser){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
        }

        await session.commitTransaction();
        await session.endSession();
    }catch(error){
        await session.abortTransaction();
        await session.endSession();
        console.log(error);
    }

};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDb
};
