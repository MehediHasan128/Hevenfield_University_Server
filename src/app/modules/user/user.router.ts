import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import valiDationRequest from '../../middlwares/validationRequest';
import { StudentValidation } from '../student/student.validation';
import { upload } from '../../utils/sendImageToCloudinary';
import { FacultyValidation } from '../faculty/faculty.validation';
import { AdminValidation } from '../admin/admin.validation';
import Auth from '../../middlwares/auth';
import { userRole } from './user.constant';
import { RegistrarValidation } from '../registrar/registrar.validation';

const router = express.Router();

// Create student
router.post(
  '/create-student',
  Auth(userRole.registrar),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  valiDationRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent,
);

// Create faculty
router.post(
  '/create-faculty',
  Auth(userRole.registrar),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  valiDationRequest(FacultyValidation.createFacultyValidationSchema),
  UserController.createFaculty,
);

// Create admin
router.post(
  '/create-admin',
  Auth(userRole.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  valiDationRequest(AdminValidation.createAdminValidationSchema),
  UserController.createAdmin,
);

// Create registrar
router.post(
  '/create-registrar',
  Auth(userRole.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  valiDationRequest(RegistrarValidation.createRegistrarValidationSchema),
  UserController.createRegistrar,
);

export const UserRoutes = router;