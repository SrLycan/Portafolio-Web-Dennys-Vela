import express from 'express';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/errorHandler.js';
import { protect, admin } from '../middleware/auth.js';
import {
  getProfile,
  updateProfile,
  addEducacion,
  deleteEducacion,
  addProyecto,
  deleteProyecto
} from '../controllers/profileController.js';

const router = express.Router();

// Validaciones
const profileValidation = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .trim(),
  body('titulo')
    .notEmpty()
    .withMessage('El título es requerido')
    .trim(),
  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es requerida')
    .trim(),
  body('contacto.email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  handleValidationErrors
];

const educacionValidation = [
  body('institucion')
    .notEmpty()
    .withMessage('La institución es requerida')
    .trim(),
  body('titulo')
    .notEmpty()
    .withMessage('El título es requerido')
    .trim(),
  body('periodo')
    .notEmpty()
    .withMessage('El periodo es requerido')
    .trim(),
  handleValidationErrors
];

const proyectoValidation = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre del proyecto es requerido')
    .trim(),
  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es requerida')
    .trim(),
  handleValidationErrors
];

// Rutas públicas
router.get('/', getProfile);

// Rutas protegidas (solo admin)
router.put('/', protect, admin, profileValidation, updateProfile);
router.post('/educacion', protect, admin, educacionValidation, addEducacion);
router.delete('/educacion/:id', protect, admin, deleteEducacion);
router.post('/proyectos', protect, admin, proyectoValidation, addProyecto);
router.delete('/proyectos/:id', protect, admin, deleteProyecto);

export default router;
