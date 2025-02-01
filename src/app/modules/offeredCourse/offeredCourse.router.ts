import express from 'express';
import valiDationRequest from '../../middlwares/validationRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controller';

const router = express.Router();

// Create offered course
router.post(
  '/create-offered-course',
  valiDationRequest(
    OfferedCourseValidation.createOfferedCourseValidationSchema,
  ),
  OfferedCourseController.createOfferedCourse,
);
// Get all offered course
router.get('/', OfferedCourseController.getAllOfferedCourse);
// Get single offered course
// Update single offered course
router.patch('/:offeredCourseId', OfferedCourseController.updateOfferedCourse);

export const OfferedCourseRoutes = router;
