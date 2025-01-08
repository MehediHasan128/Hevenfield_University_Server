import express from 'express';
import valiDationRequest from '../../middlwares/validationRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

// Create academic faculty
router.post('/create-academic-semester', valiDationRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema), AcademicSemesterController.createAcademicSemester);

export const AcademicSemesterRoutes = router;
