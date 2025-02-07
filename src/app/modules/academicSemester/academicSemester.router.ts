import express from 'express';
import valiDationRequest from '../../middlwares/validationRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
import Auth from '../../middlwares/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

// Create academic faculty
router.post(
  '/create-academic-semester',
  Auth(userRole.admin),
  valiDationRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);
// Get all academic faculty
router.get(
  '/',
  Auth(userRole.admin),
  AcademicSemesterController.getAllAcademicSemester,
);

export const AcademicSemesterRoutes = router;
