import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import valiDationRequest from '../../middlwares/validationRequest';
import { StudentValidation } from '../student/student.validation';
import { upload } from '../../utils/sendImageToCloudinary';
import { FacultyValidation } from '../faculty/faculty.validation';

const router = express.Router();

// Create student
router.post(
  '/create-student',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  valiDationRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent,
);
router.post('/create-faculty', valiDationRequest(FacultyValidation.createFacultyValidationSchema), UserController.createFaculty);

export const UserRoutes = router;
