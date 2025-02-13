import express from 'express';
import Auth from '../../middlwares/auth';
import { userRole } from '../user/user.constant';
import valiDationRequest from '../../middlwares/validationRequest';
import { AcademicSchoolValidation } from './academicSchool.validation';
import { AcademicSchoolController } from './academicSchool.controller';

const router = express.Router();

// Create academic faculty
router.post(
  '/create-academic-school',
  Auth(userRole.superAdmin),
  valiDationRequest(
    AcademicSchoolValidation.createAcademicSchoolValidationSchema,
  ),
  AcademicSchoolController.createAcademicSchool
);


// Create academic faculty
router.get(
  '/',
  AcademicSchoolController.getAllAcademicSchool
);

export const AcademicSchoolRoutes = router;
