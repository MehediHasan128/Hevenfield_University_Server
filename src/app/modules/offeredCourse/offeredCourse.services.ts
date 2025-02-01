// import httpStatus from 'http-status';
import { SemesterRegistration } from '../semesterRagistration/smesterRgistration.model';
import { TOfferedCourse } from './offeredCourse.interface';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  
  // Check the register semester is exist or not
  const isRegisterSemesterExist = await SemesterRegistration.findById(payload?.semesterRegistration);
  console.log(isRegisterSemesterExist); 

};

const getAllOfferedCourseFromDB = async () => {
  
};

const upadteOfferedCourseIntoDB = async () => {
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  upadteOfferedCourseIntoDB,
};