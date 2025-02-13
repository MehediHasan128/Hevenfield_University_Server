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
import {
  generateAdminId,
  generateBatch,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import {
  getDepartmentCostInformation,
  TDepartmentData,
} from '../../utils/getDepartmentCostInformation';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Registrar } from '../registrar/registrar.model';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  const academicsemester = await AcademicSemester.findById(
    payload.addmissionSemester,
    { _id: 0, addmissionStatus: 1 },
  );
  if (academicsemester!.addmissionStatus === 'close') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "We're sorry, the admissions for this semester are now closed.",
    );
  }

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

  // get department data
  const departmentData = await getDepartmentCostInformation(
    payload.academicDepartment,
  );
  const { addmission_fees, total_credits, credit_cost } =
    departmentData as TDepartmentData;
  // Set credits cost
  payload.creditCost = credit_cost;
  // Set credit cost after waiver
  payload.creditCostAfterWaiver = credit_cost - credit_cost * (waiver / 100);
  // Set addmission fees
  payload.addmissionFee = addmission_fees;
  // Set total creadits
  payload.totalCredits = total_credits;
  // calculate total addmission fees in 4 years
  const totalAddmissionFees = addmission_fees * Number(config.total_semester);
  // Calculate total tuition fees
  const totalTuitionFees =
    (credit_cost - credit_cost * (waiver / 100)) * total_credits;
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
    const imagePath = file?.path;
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

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // Set all user data

  // // Create a user object
  const userData: Partial<TUser> = {};
  // Set user name
  userData.userName = payload?.userName;
  // Set user email
  userData.email = payload?.email;
  // if password is not given use default password
  userData.password = password || (config.faculty_default_pass as string);
  // Set user role
  userData.role = 'faculty';
  // set user id
  const facultyID = await generateFacultyId(
    payload.academicDepartment as Types.ObjectId,
  );
  userData.id = facultyID;

  // Crete user
  const session = await startSession();

  try {
    session.startTransaction();

    // Upload image to cloudinary
    const imageName = `${facultyID}-${payload?.userName?.lastName}`;
    const imagePath = file?.path;
    const uploadImage = await sendImageToCloudinary(imagePath, imageName);
    payload.imageURL = uploadImage?.secure_url;

    // Create a user (transaction-1)
    const newUser = await User.create([userData], { session });
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
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    console.log(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // Check the admin is assign in this department
  const isExistsAdmin = await Admin.findOne({
    menegingDepartment: payload?.menegingDepartment,
  });
  if (isExistsAdmin) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This department already have an admin',
    );
  }

  // set all user data
  // Create user

  const userData: Partial<TUser> = {};

  // Set user id
  const adminId = await generateAdminId(payload?.menegingDepartment);
  userData.id = adminId;
  // Set user email
  userData.email = payload?.email;
  // Set user name
  userData.userName = payload?.userName;
  // Set user password
  userData.password = password || config.admin_default_pass;
  // Set user role
  userData.role = 'admin';

  // Start transection rollback
  const session = await startSession();

  try {
    session.startTransaction();

    // Upload image to cloudinary
    const imageName = `${adminId}-${payload?.userName?.lastName}`;
    const imagePath = file?.path;
    const uploadImage = await sendImageToCloudinary(imagePath, imageName);
    payload.imageURL = uploadImage?.secure_url;

    // Create user into db
    const newUser = await User.create([userData], { session });

    // Set userId or employ id in admin collection
    payload.id = newUser[0]?.id;
    payload.userId = newUser[0]?._id;

    // Now create admin into db
    const newAdmin = await Admin.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error);
  }
};

const createRegistrarIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // set all user data
  // Create user

  const userData: Partial<TUser> = {};

  // Set user id
  userData.id = 'REG-001';
  // Set user email
  userData.email = payload?.email;
  // Set user name
  userData.userName = payload?.userName;
  // Set user password
  userData.password = password || config.registrar_default_pass;
  // Set user role
  userData.role = 'registrar';

  // Start transection rollback
  const session = await startSession();

  try {
    session.startTransaction();

    // Upload image to cloudinary
    const imageName = `${userData.id}-${payload?.userName?.lastName}`;
    const imagePath = file?.path;
    const uploadImage = await sendImageToCloudinary(imagePath, imageName);
    payload.imageURL = uploadImage?.secure_url;

    // Create user into db
    const newUser = await User.create([userData], { session });

    // Set userId or employ id in admin collection
    payload.id = newUser[0]?.id;
    payload.userId = newUser[0]?._id;

    // Now create admin into db
    const newRegistrar = await Registrar.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();
    return newRegistrar;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  createRegistrarIntoDB,
};
