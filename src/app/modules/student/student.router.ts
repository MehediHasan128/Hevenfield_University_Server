import express from 'express';
import { StudentController } from './student.controller';
import valiDationRequest from '../../middlwares/validationRequest';
import { StudentValidation } from './student.validation';

const router = express.Router();

// Get all student
router.get('/', StudentController.getAllStudent);

// Get single student
router.get('/:studentId', StudentController.getSingleStudent);

// Update student
router.patch('/:studentId', valiDationRequest(StudentValidation.updateStudentValidationSchema), StudentController.updateStudent);

export const StudentRoutes = router;