import { AcademicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester, TSemesterCode } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

  const getSemesterCode = AcademicSemesterNameCodeMapper[payload.semesterName];
  payload.semesterCode = getSemesterCode as TSemesterCode;

  const data = await AcademicSemester.create(payload);
  return data;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
