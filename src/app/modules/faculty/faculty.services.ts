import QueryBuilder from '../../buildre/QueryBuildre';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { facultySearchableField } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import httpStatus from 'http-status';

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find(), query)
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
    console.log(payload);

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
}

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB
};
