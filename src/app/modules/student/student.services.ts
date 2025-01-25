import QueryBuilder from '../../buildre/QueryBuildre';
import AppError from '../../errors/AppError';
import { studentSearchableFields } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import httpStatus from 'http-status';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('addmissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: { path: 'academicFaculty' },
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
      populate: { path: 'academicFaculty' },
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
  };

  const isStudentDelete = isStudentExist.isDeleted;
  if (isStudentDelete === true) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This student is already deleted',
    );
  };

  const data = await Student.findOneAndUpdate({id: studentId}, payload, {new: true});
  return data;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
};
