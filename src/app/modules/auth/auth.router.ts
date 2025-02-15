import express from 'express';
import Auth from '../../middlwares/auth';
import { userRole } from '../user/user.constant';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import valiDationRequest from '../../middlwares/validationRequest';

const router = express.Router();

// User login
router.post('/login', valiDationRequest(AuthValidation.userLoginValidationSchema), AuthController.userLogin);
// Change user password
router.post('/change-password', Auth(userRole.superAdmin, userRole.admin, userRole.registrar, userRole.faculty, userRole.student), valiDationRequest(AuthValidation.changeUserPassword), AuthController.changePassword);
// Forget user password
router.post('/forget-password', valiDationRequest(AuthValidation.forgetPasswordValidationSchema), AuthController.forgetPassword);
// Reset user password
router.post('/reset-password', valiDationRequest(AuthValidation.resetPasswordValidationSchema), AuthController.resetPassword);
// Refresh token
router.post('/refresh-token', AuthController.userRefreshToken);

export const AuthRoutes = router;