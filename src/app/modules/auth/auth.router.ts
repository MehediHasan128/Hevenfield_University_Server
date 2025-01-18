import express from 'express';
import { AuthController } from './auth.controller';
import valiDationRequest from '../../middlwares/validationRequest';
import { AuthValidation } from './auth.validation';
import Auth from '../../middlwares/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

// User login
router.post('/login', valiDationRequest(AuthValidation.userLoginValidationSchema), AuthController.userLogin);
// Change user password
router.post('/change-password', Auth(userRole.student), valiDationRequest(AuthValidation.changeUserPassword), AuthController.changePassword);
// Forget user password
router.post('/forget-password', valiDationRequest(AuthValidation.forgetPasswordValidationSchema), AuthController.forgetPassword);
// Reset user password
router.post('/reset-password', valiDationRequest(AuthValidation.resetPasswordValidationSchema), AuthController.resetPassword);

export const AuthRoutes = router;