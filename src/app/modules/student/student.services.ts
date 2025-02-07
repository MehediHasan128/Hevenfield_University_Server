import mongoose from 'mongoose';
import QueryBuilder from '../../buildre/QueryBuildre';
import AppError from '../../errors/AppError';
import { studentSearchableFields } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find({isDeleted: false})
      .populate('addmissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: { path: 'academicSchool' },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await studentQuery.queryModel;

  return data;
};

const getSingleStudentFromDB = async (studentId: string) => {
  const isStudentExist = await Student.findOne({ id: studentId })
    .populate('addmissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicSchool' },
    });
  if (!isStudentExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This student is dose not exists in Havenfield University dataBase',
    );
  }

  const isStudentDelete = isStudentExist.isDeleted;
  if (isStudentDelete === true) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This student is already deleted',
    );
  }

  return isStudentExist;
};

const updateStudentIntoDB = async (
  studentId: string,
  payload: Partial<TStudent>,
) => {
  const isStudentExist = await Student.findOne({ id: studentId });
  if (!isStudentExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This student is dose not exists in Havenfield University dataBase',
    );
  }

  const isStudentDelete = isStudentExist.isDeleted;
  if (isStudentDelete === true) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This student is already deleted',
    );
  }

  const data = await Student.findOneAndUpdate({ id: studentId }, payload, {
    new: true,
  });
  return data;
};

const deleteStudentIntoDB = async (studentId: string) => {

  // Create session
  const session = await mongoose.startSession();

  try{
    
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate({id: studentId}, {isDeleted: true}, {new: true, session});
    if(!deletedStudent){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const deletedUser = await User.findOneAndUpdate({id: studentId}, {isDeleted: true}, {new: true, session});
    if(!deletedUser){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction();
    await session.endSession();

  }catch(err){
    await session.abortTransaction();
    await session.endSession();
    console.log(err);
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentIntoDB,
};
