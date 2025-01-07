import express from 'express';
import valiDationRequest from '../../middlwares/validationRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

// Create academic department
router.post('/create-academic-department', valiDationRequest(AcademicDepartmentValidation.createAcdemicDepartmentValidationSchema), AcademicDepartmentController.createAcademicDepartment);

export const AcademicDepartmentRoutes = router;