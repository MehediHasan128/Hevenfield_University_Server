import express from 'express';
import valiDationRequest from '../../middlwares/validationRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

// Create academic faculty
router.post('/create-academic-faculty', valiDationRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyController.createAcademicFaculty);

export const AcademicFaccultyRoutes = router;