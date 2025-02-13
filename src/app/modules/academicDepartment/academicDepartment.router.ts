import express from 'express';
import valiDationRequest from '../../middlwares/validationRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';
import Auth from '../../middlwares/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

// Create academic department
router.post('/create-academic-department', valiDationRequest(AcademicDepartmentValidation.createAcdemicDepartmentValidationSchema), AcademicDepartmentController.createAcademicDepartment);

// Create academic department
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

export const AcademicDepartmentRoutes = router;