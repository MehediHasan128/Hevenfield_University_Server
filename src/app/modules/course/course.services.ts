import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async(payload: TCourse) => {
  
    // Check the course is create or not
    const isExistCourse = await Course.findOne({courseTitle: payload?.courseTitle});
    if(isExistCourse){
        throw new AppError(httpStatus.CONFLICT, 'This course already created');
    }

    // Create the course
    const data = await Course.create(payload);
    return data;

};

const getAllCourseFromDB = async() => {
    console.log(2);
};

const getSingleCorseFromDB = async() => {
    console.log(3);
};

const updateSingleCourseIntoDB = async() => {
    console.log(4);
};

const deleteCourseFromDB = async() => {
    console.log(5);
};

const assignFacultiesWithCourseIntoDB = async() => {
    console.log(6);
}


const removeFacultiesWithCourseFromDB = async() => {
    console.log(7);
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCorseFromDB,
  updateSingleCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesWithCourseFromDB
};