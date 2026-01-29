import express from 'express';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/errorHandler.js';
import { protect } from '../middleware/auth.js';
import {
  register,
  login,
  getMe,
  changePassword
} from '../controllers/authController.js';

const router = express.Router();

// Validaciones
const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Debe proporcionar un email válido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener al menos un número'),
  handleValidationErrors
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Debe proporcionar un email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida'),
  handleValidationErrors
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('La contraseña actual es requerida'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('La nueva contraseña debe tener al menos 6 caracteres')
    .matches(/\d/)
    .withMessage('La nueva contraseña debe contener al menos un número'),
  handleValidationErrors
];

// Rutas públicas
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Rutas protegidas
router.get('/me', protect, getMe);
router.put('/changepassword', protect, changePasswordValidation, changePassword);

export default router;
