import express from 'express';
import { AdminController } from './admin.controller';
import valiDationRequest from '../../middlwares/validationRequest';
import { AdminValidation } from './admin.validation';
import Auth from '../../middlwares/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

// Get all admin
router.get('/', Auth(userRole.superAdmin), AdminController.getAllAdmin);

// Get single admin
router.get('/:adminId', Auth(userRole.superAdmin), AdminController.getSingleAdmin);

// Update admin
router.patch(
  '/:adminId',
  valiDationRequest(AdminValidation.updateAdminValidationSchema),
  AdminController.updateAdmin,
);

// Delete admin
router.delete('/:adminId', Auth(userRole.superAdmin), AdminController.deleteAdmin);

export const AdminRoutes = router;