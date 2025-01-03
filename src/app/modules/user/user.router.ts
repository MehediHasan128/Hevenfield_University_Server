import express from 'express';
import { UserController } from './user.controller';
import valiDationRequest from '../../middlwares/validationRequest';
import { StudentValidation } from '../student/student.validation';

const router = express.Router();


// Create student
router.post('/create-student', valiDationRequest(StudentValidation.createStudentValidationSchema), UserController.createStudent);


export const UserRoutes = router;