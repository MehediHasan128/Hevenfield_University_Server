import express from 'express';
import { RegistrarController } from './registrar.controller';

const router = express.Router();

// Get all Registrar from db
router.get('/', RegistrarController.getAllRegistrar)

export const RegistrarRoutes = router;