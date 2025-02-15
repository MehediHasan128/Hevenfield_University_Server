import express from 'express';
import { RegistrarController } from './registrar.controller';

const router = express.Router();

// Get all Registrar from db
router.get('/', RegistrarController.getAllRegistrar)
// Get single Registrar from db
router.get('/:registrarId', RegistrarController.getSingleRegistrar)

export const RegistrarRoutes = router;