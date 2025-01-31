import express from 'express';
import { SemesterRegistrationController } from './smesterRgistration.controller';

const router = express.Router();

// Create Semester registration
router.post('/create-semester-registration', SemesterRegistrationController.createSemesterRegistration);
// Get all semester registration
router.get('/', SemesterRegistrationController.getAllSemesterRegistration);
// Get single semester registration
router.get('/:semesterRegistrationId', SemesterRegistrationController.getSingleSemesterRegistration);
// Update single semester registration
router.patch('/:semesterRegistrationId', SemesterRegistrationController.updateSemesterRegistration);

export const SemesterRegistrationRoutes = router;