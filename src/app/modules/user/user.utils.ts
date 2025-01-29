import { Types } from 'mongoose';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { User } from './user.model';
import { Student } from '../student/student.model';

const findLastUser = async (userRole: string) => {
  const lastUser = await User.findOne({ role: userRole }, { _id: 0, id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return lastUser?.id ? lastUser.id : undefined;
};

export const generateStudentId = async (
  semesterId: Types.ObjectId,
  departmentId: Types.ObjectId,
) => {
  const academicSemester = await AcademicSemester.findById(semesterId, {
    _id: 0,
    year: 1,
    semesterCode: 1,
  });
  const academicDepartment = await AcademicDepartment.findById(departmentId, {
    _id: 0,
    departmentCode: 1,
  });

  const currentStudentAddmissionYear = academicSemester?.year
    ?.toString()
    .slice(-2);
  const currentStudentAddmissionSemesterCode = academicSemester?.semesterCode;
  const currentStudentDepartmentCode = academicDepartment?.departmentCode
    ?.toString()
    .slice(-3);

  const lastStudentId = await findLastUser('student');
  const lastStudentAddmissionYear = lastStudentId?.substring(0, 2);
  const lastStudentAddmissionSemesterCode = lastStudentId?.substring(2, 4);
  const lastStudentDepartmentCode = lastStudentId?.substring(4, 7);

  let currentStudentId = (0).toString();

  if (
    lastStudentId &&
    lastStudentAddmissionYear === currentStudentAddmissionYear &&
    lastStudentAddmissionSemesterCode ===
      currentStudentAddmissionSemesterCode &&
    lastStudentDepartmentCode === currentStudentDepartmentCode
  ) {
    currentStudentId = lastStudentId?.substring(9);
  }

  let incrementId = (Number(currentStudentId) + 1).toString().padStart(3, '0');

  incrementId = `${currentStudentAddmissionYear}${currentStudentAddmissionSemesterCode}${currentStudentDepartmentCode}${incrementId}`;

  return incrementId;
};

export const generateBatch = async (
  semesterId: Types.ObjectId,
  departmentId: Types.ObjectId,
) => {

  // Initial first student batch
  let studentBatch = "Batch-01";

  // Find academic semester and academic department
  const academicSemester = await AcademicSemester.findById(semesterId, {_id: 0, year: 1, semesterCode: 1});
  const academicDepartment = await AcademicDepartment.findById(departmentId, {_id: 0, departmentCode: 1});

  // find out the addmission year, semester code, department code
  const addmissionYear = academicSemester?.year.substring(2);
  const semesterCode = academicSemester?.semesterCode;
  const departmentCode = academicDepartment?.departmentCode.substring(2);

  // Check the student database if the coming department student is exist or not
  const isStudentExistOnADepartment = await Student.findOne({academicDepartment: departmentId}, {_id: 0, batch: 1, id: 1}).sort({ createdAt: -1 });
  
  // find last student addmission year, semester code, department code, or batch
  const lastStudentAddmissionYear = isStudentExistOnADepartment?.id.substring(0, 2);
  const lastStudentSemesterCode = isStudentExistOnADepartment?.id.substring(2, 4);
  const lastStudentDepartmentCode = isStudentExistOnADepartment?.id.substring(4, 7);
  const lastStudentBatch = isStudentExistOnADepartment?.batch;
  
  // Set student batch is isStudentExistOnADepartment is null
  if(!isStudentExistOnADepartment){
    studentBatch = "Batch-01";
  };


  // check the last student addmission year, semester code or department is equal to semester year, semester code or department code
  if(isStudentExistOnADepartment && lastStudentAddmissionYear === addmissionYear && lastStudentSemesterCode === semesterCode && lastStudentDepartmentCode === departmentCode){
    studentBatch = lastStudentBatch!
  }else{
    studentBatch = "Batch-02"
  }


  return studentBatch;
};

export const generateFacultyId = async(departmentId: Types.ObjectId) => {
  const currentDepartment = await AcademicDepartment.findById(departmentId, {_id: 0, departmentCode: 1});
  const currentDepartmentCode = currentDepartment?.departmentCode;

  let currentId = (0).toString();

  const lastFacultyId = await findLastUser('faculty');
  const lastdepartmentCode = lastFacultyId?.substring(2,7);
  
  if(lastFacultyId && lastdepartmentCode === currentDepartmentCode){
    currentId = lastFacultyId?.substring(7);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(3, '0');
  
  incrementId = `F-${currentDepartmentCode}${incrementId}`;
  return incrementId;
}