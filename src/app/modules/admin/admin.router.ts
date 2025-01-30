import express from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

// Get all faculties
router.get('/', AdminController.getAllAdmin);

// Get single faculty
router.get('/:adminId', AdminController.getSingleAdmin);

// Update faculty
router.patch(
  '/:adminId',
  AdminController.updateAdmin
);

// Delete faculty
router.delete('/:adminId', AdminController.deleteAdmin);

export const AdminRoutes = router;