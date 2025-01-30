import express from 'express';
import { FacultyController } from './faculty.controller';
import valiDationRequest from '../../middlwares/validationRequest';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

// Get all faculties
router.get('/', FacultyController.getAllFaculty);

// Get single faculty
router.get('/:facultyId', FacultyController.getSingleFaculty);

// Update faculty
router.patch(
  '/:facultyId',
  valiDationRequest(FacultyValidation.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

export const FacultyRoutes = router;
