import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// Get all student
router.get('/', StudentController.getAllStudent);

export const StudentRoutes = router;