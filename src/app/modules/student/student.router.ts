import express from 'express';
import { StudentController } from './student.controller';
import valiDationRequest from '../../middlwares/validationRequest';
import { StudentValidation } from './student.validation';
import Auth from '../../middlwares/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

// Get all student
router.get('/', Auth(userRole.superAdmin, userRole.admin), StudentController.getAllStudent);

// Get single student
router.get('/:studentId', Auth(userRole.superAdmin, userRole.admin, userRole.student), StudentController.getSingleStudent);

// Update student
router.patch('/:studentId', Auth(userRole.superAdmin, userRole.admin), valiDationRequest(StudentValidation.updateStudentValidationSchema), StudentController.updateStudent);

// Delete student
router.delete('/:studentId', Auth(userRole.superAdmin, userRole.admin), StudentController.deleteStudent);

export const StudentRoutes = router;