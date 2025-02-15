import express from 'express';
import { FacultyController } from './faculty.controller';
import valiDationRequest from '../../middlwares/validationRequest';
import { FacultyValidation } from './faculty.validation';
import Auth from '../../middlwares/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

// Get all faculties
router.get('/', Auth(userRole.superAdmin, userRole.admin), FacultyController.getAllFaculty);

// Get single faculty
router.get('/:facultyId', Auth(userRole.superAdmin, userRole.admin), FacultyController.getSingleFaculty);

// Update faculty
router.patch(
  '/:facultyId',
  Auth(userRole.superAdmin, userRole.admin),
  valiDationRequest(FacultyValidation.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

// Delete faculty
router.delete('/:facultyId', Auth(userRole.superAdmin, userRole.admin), FacultyController.deleteFaculty)

export const FacultyRoutes = router;
