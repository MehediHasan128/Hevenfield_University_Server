import QueryBuilder from '../../buildre/QueryBuildre';
import { departmentSearchableField } from './academicDepartment.contant';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const data = await AcademicDepartment.create(payload);
  return data;
};

const getAllACademicDepartmentFromDB = async(query: Record<string, unknown>) => {
  const academicDepartmentQuery = new QueryBuilder(AcademicDepartment.find().populate("academicSchool"), query).search(departmentSearchableField).filter().sort().paginate().fields();
  
  const data = await academicDepartmentQuery.queryModel;
  return data;
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllACademicDepartmentFromDB
};
