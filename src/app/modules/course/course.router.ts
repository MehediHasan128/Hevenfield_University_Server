import express from 'express';
import validateRequest from '../../middlwares/validationRequest';
import { CourseValidations } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();

// Create course
router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);
// get all course
router.get(
  '/',
  CourseController.getAllCourse,
);
// get single course
router.get(
  '/:courseId',
  CourseController.getSingleCourse,
);
// update single course
router.patch(
  '/:courseId',
  CourseController.updateSingleCourse,
);

export const CourseRoutes = router;