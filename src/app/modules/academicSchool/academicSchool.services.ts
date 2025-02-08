import { TAcademicSchool } from './academicSchool.interface';
import { AcademicSchool } from './academicSchool.model';

const createAcademicSchoolIntoDB = async (payload: TAcademicSchool) => {
  const data = await AcademicSchool.create(payload);
  return data;
};

const getAllAcademicSchoolFromDB = async () => {
  const data = await AcademicSchool.find();
  return data;
};

export const AcademicSchoolServices = {
  createAcademicSchoolIntoDB,
  getAllAcademicSchoolFromDB
};
