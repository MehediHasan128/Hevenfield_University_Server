import express from 'express';
import { AuthController } from './auth.controller';
import valiDationRequest from '../../middlwares/validationRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

// User login
router.post('/login', valiDationRequest(AuthValidation.userLoginValidationSchema), AuthController.userLogin);

export const AuthRoutes = router;