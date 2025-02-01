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

export const CourseRoutes = router;