import { startSession } from 'mongoose';
import QueryBuilder from '../../buildre/QueryBuildre';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { facultySearchableField } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import httpStatus from 'http-status';

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find({isDeleted: false}), query)
    .search(facultySearchableField)
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await facultyQuery.queryModel;
  return data;
};

const getSingleFacultyFromDB = async (facultyId: string) => {

    // Check if the faculty is exist or not
    const isExistsFaculty = await User.findOne({id: facultyId, role: 'faculty'});
    if(!isExistsFaculty){
        throw new AppError(httpStatus.BAD_REQUEST, 'Faculty not found');
    };
    // Check the faculty is delete or not
    const isDeleteFaculty = isExistsFaculty?.isDeleted;
    if(isDeleteFaculty === true){
        throw new AppError(httpStatus.BAD_REQUEST, 'Faculty is already deleted');
    };
    // Check the faculty status
    const facultyStatus = isExistsFaculty?.status;
    if(facultyStatus === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN, 'This faculty is blocked');
    };

  const data = await Faculty.findOne({ id: facultyId });
  return data;
};

const updateFacultyIntoDB = async(facultyId: string, payload: Partial<TFaculty>) => {

    // Check if the faculty is exist or not
    const isExistsFaculty = await User.findOne({id: facultyId, role: 'faculty'});
    if(!isExistsFaculty){
        throw new AppError(httpStatus.BAD_REQUEST, 'Faculty not found');
    };
    // Check the faculty is delete or not
    const isDeleteFaculty = isExistsFaculty?.isDeleted;
    if(isDeleteFaculty === true){
        throw new AppError(httpStatus.BAD_REQUEST, 'Faculty is already deleted');
    };
    // Check the faculty status
    const facultyStatus = isExistsFaculty?.status;
    if(facultyStatus === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN, 'This faculty is blocked');
    };

    // Update faculty
    const data = await Faculty.findOneAndUpdate({id: facultyId}, payload, {new: true});
    return data;
};

const deleteFacultyFromDb = async(facultyId: string) => {

    // Check if the faculty is exist or not
    const isExistsFaculty = await User.findOne({id: facultyId, role: 'faculty'});
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
        const deleteFaculty = await Faculty.findOneAndUpdate({id: facultyId}, {isDeleted: true}, {new: true, session});
        if(!deleteFaculty){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty')
        }

        // Now delete the user
        const deletUser = await User.findOneAndUpdate({id: facultyId}, {isDeleted: true}, {new: true, session});
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

}

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDb
};
