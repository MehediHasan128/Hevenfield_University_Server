import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import httpStatus from 'http-status';
import { CourseServices } from './course.services';

const createCourse = catchAsync(async (req, res) => {

  const data = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: data,
  });
});

const getAllCourse = catchAsync(async (req, res) => {

  const data = await CourseServices.getAllCourseFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all course successfully',
    data: data,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {

  const data = await CourseServices.getSingleCorseFromDB(req.params.courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single course successfully',
    data: data,
  });
});

const updateSingleCourse = catchAsync(async (req, res) => {

  const data = await CourseServices.updateSingleCourseIntoDB(req.params.courseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is update successfully',
    data: data,
  });
});

const deleteCourse = catchAsync(async (req, res) => {

  const data = await CourseServices.deleteCourseFromDB(req.params.courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course delete successfully',
    data: data,
  });
});

const assignFacultiesWithCourse = catchAsync(async(req, res) => {

  const data = await CourseServices.assignFacultiesWithCourseIntoDB(req.params.courseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty assign successfully',
    data: data,
  });
})

const removeFacultiesWithCourse = catchAsync(async(req, res) => {

  const data = await CourseServices.removeFacultiesWithCourseFromDB(req.params.courseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty remove successfully',
    data: data,
  });
})

export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateSingleCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesWithCourse
};