import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TCourse, TCourseFaculties } from './course.interface';
import { Course, CourseFaculties } from './course.model';
import QueryBuilder from '../../buildre/QueryBuildre';
import { startSession } from 'mongoose';

const createCourseIntoDB = async (payload: TCourse) => {
  // Check the course is create or not
  const isExistCourse = await Course.findOne({
    courseTitle: payload?.courseTitle,
  });
  if (isExistCourse) {
    throw new AppError(httpStatus.CONFLICT, 'This course already created');
  }

  // Create the course
  const data = await Course.create(payload);
  return data;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const CourseQuery = new QueryBuilder(Course.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await CourseQuery.queryModel;
  return data;
};

const getSingleCorseFromDB = async (courseId: string) => {
  const data = await Course.findById(courseId);
  return data;
};

const updateSingleCourseIntoDB = async (
  courseId: string,
  payload: Partial<TCourse>,
) => {
  const { preRequisiteCourse, ...courseRemainingData } = payload;

  const session = await startSession();

  try {
    session.startTransaction();

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      courseId,
      courseRemainingData,
      { new: true, session },
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    // check if there are any pre requisite course to update
    if (preRequisiteCourse && preRequisiteCourse.length) {
      // filter out the deleted field
      const deletedPreRequisites = preRequisiteCourse
        .filter((ele) => ele.course && ele.isDeleted)
        .map((ele) => ele.course);

      const deletePreRequisitesCorse = await Course.findByIdAndUpdate(
        courseId,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPreRequisites } },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletePreRequisitesCorse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to delete pre requisites course',
        );
      }

      // filter out the new course field
      const newPreRequisites = preRequisiteCourse?.filter(
        (ele) => ele.course && ele.isDeleted,
      );

      const newPreRequisitesCorse = await Course.findByIdAndUpdate(
        courseId,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisites } },
        },
        { new: true, runValidators: true, session },
      );
      if (!newPreRequisitesCorse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to add pre requisites course',
        );
      }
    }
    await session.commitTransaction();
    await session.endSession();

    const data = await Course.findById(courseId).populate(
      'preRequisiteCourse.course',
    );

    return data;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error);
  }
};

const deleteCourseFromDB = async (courseId: string) => {
  
    const data = await Course.findByIdAndUpdate(courseId, {isDeleted: true}, {new: true});
    return data;

};

const assignFacultiesWithCourseIntoDB = async (courseId: string, payload: TCourseFaculties) => {
  
    const data = await CourseFaculties.findByIdAndUpdate(
        courseId,
        {
            course: courseId,
            $addToSet: { faculties: {$each: payload }}
        },
        {
            upsert: true,
            new: true
        }
    );
    return data;

};

const removeFacultiesWithCourseFromDB = async (courseId: string, payload: TCourseFaculties) => {
    const data = await CourseFaculties.findByIdAndUpdate(
        courseId,
        {
          $pull: { faculties: { $in: payload } }
        },
        {
          new: true
        }
      );
    
      return data;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCorseFromDB,
  updateSingleCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesWithCourseFromDB,
};
