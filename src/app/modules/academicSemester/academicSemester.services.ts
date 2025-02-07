import httpStatus from 'http-status';
import AppError from "../../errors/AppError";
import { AcademicSemester } from "./academicSemester.model";
import { AcademicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester, TSemesterCode } from "./academicSemester.interface";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

  // Check if the semester is exists on database in same year
  const isSemesterExists = await AcademicSemester.findOne({
    year: payload.year,
    semesterName: payload.semesterName
  });

  if(isSemesterExists){
    throw new AppError(httpStatus.CONFLICT, 'This semester is already exists in this year');
  }

  const getSemesterCode = AcademicSemesterNameCodeMapper[payload.semesterName];
  payload.semesterCode = getSemesterCode as TSemesterCode;

  const data = await AcademicSemester.create(payload);
  return data;
};


const getAllAcademicSemesterFromDB = async() => {
  const data = await AcademicSemester.find();
  return data;
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB
};
