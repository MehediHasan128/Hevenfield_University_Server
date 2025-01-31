import express from 'express';
import { AdminController } from './admin.controller';
import valiDationRequest from '../../middlwares/validationRequest';
import { AdminValidation } from './admin.validation';

const router = express.Router();

// Get all admin
router.get('/', AdminController.getAllAdmin);

// Get single admin
router.get('/:adminId', AdminController.getSingleAdmin);

// Update admin
router.patch(
  '/:adminId',
  valiDationRequest(AdminValidation.updateAdminValidationSchema),
  AdminController.updateAdmin,
);

// Delete admin
router.delete('/:adminId', AdminController.deleteAdmin);

export const AdminRoutes = router;