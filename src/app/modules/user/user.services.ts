/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
import { User } from './user.model';
import httpStatus from 'http-status';
import { TUser } from './user.interface';
import AppError from '../../errors/AppError';
import { startSession, Types } from 'mongoose';
import { Student } from '../student/student.model';
import { TStudent } from '../student/student.interface';
import { TFaculty } from '../faculty/faculty.interface';
import calculateWaiver from '../../utils/calculateWaiver';
import { generateBatch, generateFacultyId, generateStudentId } from './user.utils';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { getDepartmentCostInformation } from '../../utils/getDepartmentCostInformation';
import { Faculty } from '../faculty/faculty.model';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // Set all user data

  // Create a user object
  const userData: Partial<TUser> = {};
  // Set student id
  const studenId = await generateStudentId(
    payload.addmissionSemester as Types.ObjectId,
    payload.academicDepartment as Types.ObjectId,
  );
  userData.id = studenId;
  // Set user email from payload
  userData.email = payload.email;
  // set user name
  userData.userName = payload?.userName;
  // if password is not given use default password
  userData.password = password || (config.student_default_pass as string);
  // Set user role
  userData.role = 'student';





  // Calculate costing

  // Calculate student waiver
  const waiver = calculateWaiver(payload.sscResult, payload.hscResult);
  // Set waiver
  payload.waiver = `${waiver}%`;
  // get department name
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
    { _id: 0, departmentName: 1 },
  );
  // Get department cost information
  const departmentCostInformation = getDepartmentCostInformation(
    academicDepartment?.departmentName as string,
  );
  const { credits, creditCost, addmissionFees } = departmentCostInformation;
  // Set credits cost
  payload.creditCost = creditCost;
  // Set credit cost after waiver
  payload.creditCostAfterWaiver = creditCost - creditCost * (waiver / 100);
  // Set addmission fees
  payload.addmissionFee = addmissionFees;
  // Set total creadits
  payload.totalCredits = credits;
  // calculate total addmission fees in 4 years
  const totalAddmissionFees = addmissionFees * Number(config.total_semester);
  // Calculate total tuition fees
  const totalTuitionFees = (creditCost - creditCost * (waiver / 100)) * credits;
  // Calculate total cost in 4 years
  payload.totalCost = totalAddmissionFees + totalTuitionFees;

  // Generate Batch
  const studentBatch = await generateBatch(
    payload.addmissionSemester as Types.ObjectId,
    payload.academicDepartment as Types.ObjectId,
  );
  payload.batch = studentBatch;
  payload.section = 'A';





  // User transaction rollback functionality

  // Start a session
  const session = await startSession();

  try {
    // Start a session
    session.startTransaction();

    // Upload image to cloudinary
    const imageName = `${studenId}-${payload?.userName?.lastName}`;
    const imagePath = file?.path
    const uploadImage = await sendImageToCloudinary(imagePath, imageName);
    payload.imageURL = uploadImage?.secure_url;

    // Create a user (transaction-1)
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;
    // Create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    await session.endSession();
  }
};








const createFacultyIntoDB = async (file: any, password: string, payload: TFaculty) => {
  // Set all user data
  
  // // Create a user object
  const userData: Partial<TUser> = {};
  // Set user name
  userData.userName = payload?.userName;
  // Set user email
  userData.email = payload?.email;
  // if password is not given use default password
  userData.password = password || (config.faculty_default_pass as string)
  // Set user role
  userData.role = 'faculty';
  // set user id
  const facultyID = await generateFacultyId(payload.academicDepartment as Types.ObjectId);
  userData.id = facultyID;





  // Crete user
  const session = await startSession();

  try {
    session.startTransaction();


    // Upload image to cloudinary
    const imageName = `${facultyID}-${payload?.userName?.lastName}`;
    const imagePath = file?.path
    const uploadImage = await sendImageToCloudinary(imagePath, imageName);
    payload.imageURL = uploadImage?.secure_url;


    // Create a user (transaction-1)
    const newUser = await User.create([userData], {session});
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // Set id or user id in faculty data
    payload.id = newUser[0]?.id;
    payload.userId = newUser[0]?._id;

    // Create faculty
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  }catch(err){
    await session.abortTransaction();
    await session.endSession();
    console.log(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
