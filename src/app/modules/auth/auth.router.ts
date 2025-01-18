import express from 'express';
import { AuthController } from './auth.controller';
import valiDationRequest from '../../middlwares/validationRequest';
import { AuthValidation } from './auth.validation';
import Auth from '../../middlwares/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

// User login
router.post('/login', valiDationRequest(AuthValidation.userLoginValidationSchema), AuthController.userLogin);
router.post('/change-password', Auth(userRole.student), valiDationRequest(AuthValidation.changeUserPassword), AuthController.changePassword);

export const AuthRoutes = router;